type Cue = {
    id: string;
    startMS: number;
    endMS: number;
    text: string;
};
type Cues = Array<Cue>;
declare class Parser {
    #private;
    constructor(options: any);
    timestampToMilliseconds(s: string): number;
    millisecondsToTimestamp(input: number): string;
    srtToJSON(s: string): Cues;
    JSONtoSRT(cues: Cues): string;
}
declare const millisecondsToTimestamp: (input: number) => string, timestampToMilliseconds: (s: string) => number;
export default Parser;
export { Parser, millisecondsToTimestamp, timestampToMilliseconds };
export type { Cue, Cues };
