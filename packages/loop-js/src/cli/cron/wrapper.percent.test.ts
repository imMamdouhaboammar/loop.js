import { expect, test } from "bun:test"
import { cmdWrapper } from "./wrapper.ts"

const AT = 1_700_000_000

test("cmd wrapper escapes literal percent signs in generated path and argv literals", () => {
  const text = cmdWrapper(
    { id: "abc123", dir: "C:\\work\\%TEMP%\\proj", until: { settled: false } },
    ["C:\\tools\\100%\\bun.exe", "C:\\cli\\loop%20cli.ts"],
    AT,
  )

  expect(text).toContain('cd /d "C:\\work\\%%TEMP%%\\proj" || exit /b 1')
  expect(text).toContain('"C:\\tools\\100%%\\bun.exe" "C:\\cli\\loop%%20cli.ts" "run"')
  expect(text).toContain('>> "C:\\work\\%%TEMP%%\\proj\\.loop\\cron\\abc123.log" 2>&1')
  expect(text).not.toContain('"C:\\work\\%TEMP%\\proj"')
})
