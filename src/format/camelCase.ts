import capitalize from "./capitalize.ts";

/**
 * Formats a string to camel case.
 *
 * @example
 * Basic usage
 * ```js
 * // Returns journalismIsAwesome
 * const text = camelCase("Journalism is awesome")
 * ```
 *
 * @param input The string to be formatted.
 *
 * @category Formatting
 */
export default function camelCase(input: string): string {
  const words = input
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((d) => d !== "");

  // Convert to camelCase
  const camelCaseString = words
    .map((word, index) => {
      // Lowercase the entire string first
      word = word.toLowerCase();

      // Capitalize the first letter of each word except the first one
      if (index > 0) {
        word = capitalize(word);
      }

      return word;
    })
    .join("");

  return camelCaseString;
}
