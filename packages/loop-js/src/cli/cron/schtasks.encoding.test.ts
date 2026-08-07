import { expect, test } from "bun:test"
import { buildTaskXml, wrapperCommand } from "./schtasks.ts"

test("Task Scheduler XML declares UTF-16 to match the file bytes", () => {
  const xml = buildTaskXml({
    expr: "0 8 * * *",
    dir: "C:\\proj",
    command: wrapperCommand("C:\\proj\\.loop\\cron\\abc123.cmd"),
    until: { settled: false },
  })

  expect(xml.startsWith('<?xml version="1.0" encoding="UTF-16"?>')).toBe(true)
})
