import { Day } from './../day'
import Day0 from './day'

describe('On Day 0', () => {
  let day: Day;

  beforeEach(() => {
    day = new Day0();
  })

  it('part1', () => {
    expect(day.partOne('')).toBe('')
  })
  it('part2', () => {
    expect(day.partTwo('')).toBe('')
  })
})