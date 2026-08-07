import { expect, test } from "bun:test"
import { stepUsage } from "./claude.ts"
import { Interruption } from "./executor.ts"

test("unpriced non-zero token usage fails closed as a budget interruption", () => {
  try {
    stepUsage({ input_tokens: 1 }, "some-future-model")
    throw new Error("expected unpriced usage to fail closed")
  } catch (err) {
    expect(err).toBeInstanceOf(Interruption)
    expect((err as Interruption).cause).toBe("budget")
    expect((err as Interruption).detail).toContain("unpriced model")
  }
})

test("an unpriced zero-token step is still free", () => {
  expect(stepUsage({}, "some-future-model")).toEqual({
    inputTokens: 0,
    outputTokens: 0,
    cachedInputTokens: 0,
    usd: 0,
  })
})
