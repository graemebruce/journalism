import assert from "assert"
import prettyDuration from "../../src/format/prettyDuration.js"

describe("prettyDuration", () => {
    it("should return a string with a number of ms", () => {
        const duration = prettyDuration(
            new Date("2024-01-01T17:00:00"),
            new Date("2024-01-01T17:00:00.015")
        )
        assert.strictEqual(duration, "15 ms")
    })
    it("should return a string with a number of seconds", () => {
        const duration = prettyDuration(
            new Date("2024-01-01T17:00:00"),
            new Date("2024-01-01T17:00:15")
        )
        assert.strictEqual(duration, "15 sec, 0 ms")
    })
    it("should return a string with a number of seconds and minutes", () => {
        const duration = prettyDuration(
            new Date("2024-01-01T17:00:00"),
            new Date("2024-01-01T17:03:15")
        )
        assert.strictEqual(duration, "3 min, 15 sec, 0 ms")
    })
    it("should return a string with a number of seconds, minutes, and hours", () => {
        const duration = prettyDuration(
            new Date("2024-01-01T17:00:00"),
            new Date("2024-01-01T23:03:15")
        )
        assert.strictEqual(duration, "6 h, 3 min, 15 sec, 0 ms")
    })
    it("should return a string with a number of seconds, minutes, hours, and days", () => {
        const duration = prettyDuration(
            new Date("2024-01-01T17:00:00"),
            new Date("2024-01-23T23:03:15")
        )
        assert.strictEqual(duration, "22 days, 6 h, 3 min, 15 sec, 0 ms")
    })
})
