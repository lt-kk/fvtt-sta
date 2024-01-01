import { describe, expect, test } from "vitest";
import { generatePills } from "./StaTypes";


describe.concurrent("generatePills", () => {
  test("0-1", () => {
    const pills = generatePills(0, {begin:0, end:1})
    expect(pills.length).toBe(2)
    expect(pills[0].value).toBe(0)
    expect(pills[1].value).toBe(1)
  })
  test("0-6", () => {
    const pills = generatePills(0, {begin:0, end:6})
    expect(pills.length).toBe(7)
    expect(pills[6].value).toBe(6)
  })
  test("2-3", () => {
    const pills = generatePills(0, {begin:2, end:3})
    expect(pills.length).toBe(2)
    expect(pills[0].value).toBe(2)
    expect(pills[1].value).toBe(3)
  })
  test("3-2", () => {
    const pills = generatePills(0, {begin:3, end:2})
    expect(pills.length).toBe(2)
    expect(pills[0].value).toBe(3)
    expect(pills[1].value).toBe(2)
  })
  test("0-2, 0 checked", () => {
    const pills = generatePills(0, {begin:0, end:2})
    expect(pills[0].checked).toBe(true)
    expect(pills[1].checked).toBe(false)
    expect(pills[2].checked).toBe(false)
  })
  test("0-2, 1 checked", () => {
    const pills = generatePills(1, {begin:0, end:2})
    expect(pills[0].checked).toBe(false)
    expect(pills[1].checked).toBe(true)
    expect(pills[2].checked).toBe(false)
  })
  test("1-3, 2 checked", () => {
    const pills = generatePills(2, {begin:1, end:3})
    expect(pills[0].checked).toBe(false)
    expect(pills[1].checked).toBe(true)
    expect(pills[2].checked).toBe(false)
  })

  test("status 0-2, default", () => {
    const pills = generatePills(2, {begin:0, end:2})
    expect(pills[0].status).toBe("")
    expect(pills[1].status).toBe("")
    expect(pills[2].status).toBe("")
  })
  test("status 0-2, fatal 0", () => {
    const pills = generatePills(2, {begin:0, end:2, fatal: 0})
    expect(pills[0].status).toBe("fatal")
    expect(pills[1].status).toBe("")
    expect(pills[2].status).toBe("")
  })
  test("status 0-2, fatal 1", () => {
    const pills = generatePills(2, {begin:0, end:2, fatal: 1})
    expect(pills[0].status).toBe("fatal")
    expect(pills[1].status).toBe("fatal")
    expect(pills[2].status).toBe("")
  })
  test("status 2-0, fatal 1", () => {
    const pills = generatePills(2, {begin:2, end:0, fatal: 1})
    expect(pills[0].status).toBe("")
    expect(pills[1].status).toBe("fatal")
    expect(pills[2].status).toBe("fatal")
  })
  test("status 0-2, fatal 1, moreIsWorse", () => {
    const pills = generatePills(2, {begin:0, end:2, fatal: 1, moreIsWorse: true})
    expect(pills[0].status).toBe("")
    expect(pills[1].status).toBe("fatal")
    expect(pills[2].status).toBe("fatal")
  })
  test("status 0-2, fatal 0, error 1", () => {
    const pills = generatePills(2, {begin:0, end:2, fatal: 0, error: 1})
    expect(pills[0].status).toBe("fatal")
    expect(pills[1].status).toBe("error")
    expect(pills[2].status).toBe("")
  })
  test("status 0-2, fatal 0, error 2", () => {
    const pills = generatePills(2, {begin:0, end:2, fatal: 0, error: 2})
    expect(pills[0].status).toBe("fatal")
    expect(pills[1].status).toBe("error")
    expect(pills[2].status).toBe("error")
  })
  test("status 0-2, error 0, warn 1", () => {
    const pills = generatePills(2, {begin:0, end:2, error: 0, warn: 1})
    expect(pills[0].status).toBe("error")
    expect(pills[1].status).toBe("warn")
    expect(pills[2].status).toBe("")
  })
  test("status 0-2, warn 0, info 1", () => {
    const pills = generatePills(2, {begin:0, end:2, warn: 0, info: 1})
    expect(pills[0].status).toBe("warn")
    expect(pills[1].status).toBe("info")
    expect(pills[2].status).toBe("")
  })
  test("status 0-2, info 0, success 1", () => {
    const pills = generatePills(2, {begin:0, end:2, info: 0, success: 1})
    expect(pills[0].status).toBe("info")
    expect(pills[1].status).toBe("success")
    expect(pills[2].status).toBe("")
  })
  test("status 0-2, fatal 0, success 1", () => {
    const pills = generatePills(2, {begin:0, end:2, fatal: 0, success: 1})
    expect(pills[0].status).toBe("fatal")
    expect(pills[1].status).toBe("success")
    expect(pills[2].status).toBe("")
  })

  test("status 6-0, fatal 6, error 5, warn 3, success 0, moreIsWorse", () => {
    const pills = generatePills(2, {begin:6, end:0, fatal: 6, error: 5, warn: 3, success: 0, moreIsWorse: true})
    expect(pills[0].status).toBe("fatal")
    expect(pills[1].status).toBe("error")
    expect(pills[2].status).toBe("warn")
    expect(pills[3].status).toBe("warn")
    expect(pills[4].status).toBe("success")
    expect(pills[5].status).toBe("success")
    expect(pills[6].status).toBe("success")
  })

})
