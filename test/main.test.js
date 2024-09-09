import { expect, test } from "vitest";

import samples from "./samples.js";
import Parser from "../src/main.ts";
import {
  millisecondsToTimestamp,
  timestampToMilliseconds,
} from "../src/main.ts";

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

test("TS to MS", () => {
  expect(timestampToMilliseconds("00:00:00.000")).toEqual(0);
  expect(timestampToMilliseconds("00:00:00,000")).toEqual(0);
  expect(timestampToMilliseconds("00:00:00.001")).toEqual(1);
});

test("MS to TS", () => {
  expect(millisecondsToTimestamp(12345)).toEqual("00:00:12,345");
});

test("MS to TS - Wrong input", () => {
  expect(() => millisecondsToTimestamp()).toThrow();
  expect(() => millisecondsToTimestamp("This is a string")).toThrow();
});
