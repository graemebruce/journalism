import { assertEquals } from "jsr:@std/assert";
import formatNumber from "../../src/format/formatNumber.ts";

Deno.test("should return the number as a string", () => {
  const string = formatNumber(10);
  assertEquals(string, "10");
});
Deno.test("should return the number with coma as a thousand separator (using 1000)", () => {
  const string = formatNumber(1000);
  assertEquals(string, "1,000");
});
Deno.test("should return the number with coma as a thousand separator (using 10000)", () => {
  const string = formatNumber(10000);
  assertEquals(string, "10,000");
});
Deno.test("should return the number with coma as a thousand separator (using 100000)", () => {
  const string = formatNumber(100000);
  assertEquals(string, "100,000");
});
Deno.test("should return the number with coma as a thousand separator and keep decimals (using 1000000000.1234)", () => {
  const string = formatNumber(1000000000.1234);
  assertEquals(string, "1,000,000,000.1234");
});
Deno.test("should return the number with + sign", () => {
  const string = formatNumber(1.12, { sign: true });
  assertEquals(string, "+1.12");
});
Deno.test("should return the number with - sign", () => {
  const string = formatNumber(-2.23, { sign: true });
  assertEquals(string, "-2.23");
});
Deno.test("should return 0 even if with option sign to true", () => {
  const string = formatNumber(0, { sign: true });
  assertEquals(string, "0");
});
Deno.test("should return the number rounded", () => {
  const string = formatNumber(1.5345, { round: true });
  assertEquals(string, "2");
});
Deno.test("should return the number rounded with 2 decimals", () => {
  const string = formatNumber(1.5345, { decimals: 2 });
  assertEquals(string, "1.53");
});
Deno.test("should return the number rounded with 2 fixed decimals", () => {
  const string = formatNumber(1.5042, { decimals: 2, fixed: true });
  assertEquals(string, "1.50");
});
Deno.test("should return the number rounded with base 10", () => {
  const string = formatNumber(11523.5345, { nearestInteger: 10 });
  assertEquals(string, "11,520");
});
Deno.test("should return the number rounded with 2 decimals and + sign", () => {
  const string = formatNumber(1.5345, { decimals: 2, sign: true });
  assertEquals(string, "+1.53");
});
Deno.test("should return the number rounded with base 10 and + sign", () => {
  const string = formatNumber(11523.5345, {
    nearestInteger: 10,
    sign: true,
  });
  assertEquals(string, "+11,520");
});
Deno.test("should return the number rounded with 2 decimals and - sign", () => {
  const string = formatNumber(-1.5345, { decimals: 2, sign: true });
  assertEquals(string, "-1.53");
});
Deno.test("should return the number rounded with 2 fixed decimals and - sign", () => {
  const string = formatNumber(-1.5023, {
    decimals: 2,
    fixed: true,
    sign: true,
  });
  assertEquals(string, "-1.50");
});
Deno.test("should return the number rounded with base 10 and - sign", () => {
  const string = formatNumber(-11523.5345, {
    nearestInteger: 10,
    sign: true,
  });
  assertEquals(string, "-11,520");
});
Deno.test("should return the number with prefix", () => {
  const string = formatNumber(-11523, {
    prefix: "$",
  });
  assertEquals(string, "$-11,523");
});
Deno.test("should return the number with suffix", () => {
  const string = formatNumber(35, {
    suffix: " C",
  });
  assertEquals(string, "35 C");
});
Deno.test("should return the number with a prefix and a suffix", () => {
  const string = formatNumber(35, {
    prefix: "Temp.: ",
    suffix: " C",
  });
  assertEquals(string, "Temp.: 35 C");
});

// Radio-Canada style

Deno.test("should return the number as a string without separator (using 1000)", () => {
  const string = formatNumber(1000, { style: "rc" });
  assertEquals(string, "1000");
});
Deno.test("should return the number with non-breaking space as a thousand separator (using 10000)", () => {
  const string = formatNumber(10000, { style: "rc" });
  assertEquals(string, "10 000");
});
Deno.test("should return the number with non-breaking space as a thousand separator (using 100000)", () => {
  const string = formatNumber(100000, { style: "rc" });
  assertEquals(string, "100 000");
});
Deno.test("should return the number with non-breaking space as a thousand separator and keep decimals (using 1000000000.1234)", () => {
  const string = formatNumber(1000000000.1234, { style: "rc" });
  assertEquals(string, "1 000 000 000,1234");
});
Deno.test("should return the number with + sign with rc style", () => {
  const string = formatNumber(1.12, { sign: true, style: "rc" });
  assertEquals(string, "+1,12");
});
Deno.test("should return the number with - sign with rc style", () => {
  const string = formatNumber(-2.23, { sign: true, style: "rc" });
  assertEquals(string, "-2,23");
});
Deno.test("should return the number rounded with rc style", () => {
  const string = formatNumber(1.5345, { round: true, style: "rc" });
  assertEquals(string, "2");
});
Deno.test("should return the number rounded with 2 decimals with rc style", () => {
  const string = formatNumber(1.5345, { decimals: 2, style: "rc" });
  assertEquals(string, "1,53");
});
Deno.test("should return the number rounded with 2 fixed decimals with rc style", () => {
  const string = formatNumber(1.5042, {
    decimals: 2,
    fixed: true,
    style: "rc",
  });
  assertEquals(string, "1,50");
});
Deno.test("should return the number rounded with base 10 with rc style", () => {
  const string = formatNumber(11523.5345, {
    nearestInteger: 10,
    style: "rc",
  });
  assertEquals(string, "11 520");
});
Deno.test("should return the number rounded with 2 decimals, + sign and rc style", () => {
  const string = formatNumber(1.5345, {
    decimals: 2,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "+1,53");
});
Deno.test("should return the number rounded, with 2 fixed decimals, +sign and rc style", () => {
  const string = formatNumber(1.2, {
    decimals: 2,
    fixed: true,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "+1,20");
});
Deno.test("should return the number rounded with base 10, + sign and rc style", () => {
  const string = formatNumber(11523.5345, {
    nearestInteger: 10,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "+11 520");
});
Deno.test("should return the number rounded with 2 decimals, - sign and rc style", () => {
  const string = formatNumber(-1.5345, {
    decimals: 2,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "-1,53");
});
Deno.test("should return the number rounded with base 10, - sign and rc style", () => {
  const string = formatNumber(-11523.5345, {
    nearestInteger: 10,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "-11 520");
});
Deno.test("should return the number with prefix and rc style", () => {
  const string = formatNumber(-11523, {
    prefix: "$",
    style: "rc",
  });
  assertEquals(string, "$-11 523");
});
Deno.test("should return the number with suffix and rc style", () => {
  const string = formatNumber(35.2, {
    suffix: " C",
    style: "rc",
  });
  assertEquals(string, "35,2 C");
});
Deno.test("should return the number with a prefix, a suffix and rc style", () => {
  const string = formatNumber(35.6, {
    prefix: "Temp.: ",
    suffix: " C",
    style: "rc",
  });
  assertEquals(string, "Temp.: 35,6 C");
});
Deno.test("should return the number round with 1 significant digit", () => {
  const string = formatNumber(0.01578, { significantDigits: 1 });
  assertEquals(string, "0.02");
});
Deno.test("should return the number round with 2 significant digits and a positive sign", () => {
  const string = formatNumber(0.01578, {
    significantDigits: 2,
    sign: true,
  });
  assertEquals(string, "+0.016");
});
Deno.test("should return the number round with 2 significant digits and a negative sign", () => {
  const string = formatNumber(-0.01578, {
    significantDigits: 2,
    sign: true,
  });
  assertEquals(string, "-0.016");
});
Deno.test("should return the number round with 2 significant digits and a percentage sign", () => {
  const string = formatNumber(1.3922092532695824, {
    suffix: "%",
    significantDigits: 2,
  });
  assertEquals(string, "1.4%");
});
