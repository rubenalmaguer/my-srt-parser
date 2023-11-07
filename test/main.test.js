import { expect, test } from "vitest";

import { Parser } from "../src/main.ts";
import samples from "./samples.js";

test("TRUNCATED - from SRT to JSON", () => {
  let parser = new Parser();
  expect(parser.srtToJSON(samples.truncated[0])).toEqual(samples.truncated[1]);
});

test("BASIC - from JSON to SRT", () => {
  let parser = new Parser();
  expect(parser.JSONtoSRT(samples.basic[1]).trim()).toEqual(
    samples.basic[0].trim()
  );
});

test("WEBVTT", () => {
  let parser = new Parser();
  expect(
    // Must wrap in function to catch error
    () => {
      parser.srtToJSON(samples.webvttNotes[0]);
    }
  ).toThrowError("Invalid");
});
