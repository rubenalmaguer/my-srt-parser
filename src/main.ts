type Cue = {
  id: string;
  startMS: number;
  endMS: number;
  text: string;
};

type Cues = Array<Cue>;

class Parser {
  #trimSpaces = true;

  static #patterns = {
    // Trim line breaks by not capturing them
    lineBreaks: "(?:\\r?\\n)+",
    lineBreaksAndSpaces: "(?:\\s*\\r?\\n\\s*)+",
    maybeLineBreaks: "(?:\\r?\\n)*",
    maybeLineBreaksAndSpaces: "(?:\\s*\\r?\\n\\s*)*",
    id: "(\\d+)",
    maybeHoursAndMinutes: "(?:\\d{1,3}:){0,2}", // Not captured individually, but with s, ms as a unit
    secondsAndMiliseconds: "\\d{1,3}[,\\.]\\d{1,3}",
    arrow: " *--> *",
  };

  #timecodeRegex;

  constructor(options: any) {
    this.#trimSpaces = options?.trimSpaces ?? true;

    // Build regex on initialization (Just to make each part of the pattern clearer)

    const {
      lineBreaks,
      lineBreaksAndSpaces,
      maybeLineBreaks,
      maybeLineBreaksAndSpaces,
      id,
      maybeHoursAndMinutes,
      secondsAndMiliseconds,
      arrow,
    } = Parser.#patterns;

    const singleTimestamp = `(${maybeHoursAndMinutes}${secondsAndMiliseconds})`; // Notice parentheses
    const fullPattern = this.#trimSpaces
      ? maybeLineBreaksAndSpaces +
        id +
        lineBreaksAndSpaces +
        singleTimestamp +
        arrow +
        singleTimestamp +
        lineBreaksAndSpaces
      : // Don't trim
        maybeLineBreaks +
        id +
        lineBreaks +
        singleTimestamp +
        arrow +
        singleTimestamp +
        lineBreaks;

    this.#timecodeRegex = new RegExp(fullPattern, "m"); // Captures groups around each timestamp and id. Needs multiline flag.
  }

  timestampToMilliseconds(s: string) {
    let result = 0;

    const [theRest, ms] = s.split(/[.,]/);
    result += parseInt(ms.padEnd(3, "0"));

    const hms = theRest.split(":");

    const seconds = hms.at(-1) ?? "0";
    result += parseInt(seconds, 10) * 1000;

    const minutes = hms.at(-2) ?? "0";
    result += parseInt(minutes, 10) * 60 * 1000;

    const hours = hms.at(-3) ?? "0";
    result += parseInt(hours, 10) * 60 * 60 * 1000;

    return result;
  }

  millisecondsToTimestamp(input: number) {
    if (isNaN(input)) {
      throw `Expected a number. Received: ${typeof input}`;
    }

    const MS_PER_HR = 3600000;
    const MS_PER_MIN = 60000;
    const MS_PER_SECOND = 1000;

    let hh, mm, ss, ms;
    let reminder;

    [hh, reminder] = [input / MS_PER_HR, input % MS_PER_HR];
    [mm, reminder] = [reminder / MS_PER_MIN, reminder % MS_PER_MIN];
    [ss, reminder] = [reminder / MS_PER_SECOND, reminder % MS_PER_SECOND];
    ms = reminder;

    hh = Math.floor(hh).toString().padStart(2, "0");
    mm = Math.floor(mm).toString().padStart(2, "0");
    ss = Math.floor(ss).toString().padStart(2, "0");
    ms = ms.toString().padStart(3, "0");

    return `${hh}:${mm}:${ss},${ms}`;
  }

  srtToJSON(s: string) {
    // Remove BOM and whitespace.
    s = s.replace(/^\uFEFF|\uFFFE/g, "");
    if (this.#trimSpaces) s = s.trim();

    // Splat items strings intertwined with the three captured groups (id, start, end)
    const items = s.split(this.#timecodeRegex);

    // Remove first item, which should be an empty tring for valid SRTs.
    let firstComp = items.shift();
    firstComp = firstComp?.trim();

    if (firstComp && firstComp.match("VTT")) {
      throw new Error("Invalid file format. Try removing VTT header.");
    }

    if (firstComp == undefined || firstComp !== "") {
      throw new Error(`Invalid file format. First comp: ${firstComp}`);
    }

    // Remove any trailing line breaks in last item.
    if (this.#trimSpaces) {
      items[items.length - 1] = items[items.length - 1].trimEnd();
    } else {
      // Even the no-trim version needs last linebreak removed
      items[items.length - 1] = items[items.length - 1].replace(/\r?\n$/, "");
    }

    const tuples = [];
    const tupleSize = 4;
    for (let i = 0; i < items.length; i += tupleSize) {
      tuples.push(items.slice(i, i + tupleSize));
    }

    // Build cues
    const cues: Cues = [];

    tuples.forEach((tuple) => {
      const [id, start, end, text] = tuple;
      cues.push({
        id,
        startMS: this.timestampToMilliseconds(start),
        endMS: this.timestampToMilliseconds(end),
        text: this.#trimSpaces ? text.replaceAll(/^\s+|\s+$/gm, "") : text,
      });
    });

    return cues;
  }

  JSONtoSRT(cues: Cues) {
    return cues.reduce((acc, curr) => {
      const startAsTimestamp = this.millisecondsToTimestamp(curr.startMS);
      const endAsTimestamp = this.millisecondsToTimestamp(curr.endMS);
      return (acc += `${curr.id}\n${startAsTimestamp} --> ${endAsTimestamp}\n${curr.text}\n\n`);
    }, "");
  }
}

module.exports = Parser;
module.exports.millisecondsToTimestamp =
  Parser.prototype.millisecondsToTimestamp;
module.exports.timestampToMilliseconds =
  Parser.prototype.timestampToMilliseconds;
