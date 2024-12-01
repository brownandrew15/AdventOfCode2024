import { Day } from './../day'
import Day01 from './day'

describe('On Day 01', () => {
  let day: Day;

  beforeEach(() => {
    day = new Day01();
  })

  it('part1', () => {
    expect(day.partOne('3   4\n4   3\n2   5\n1   3\n3   9\n3   3')).toBe('11')
  })
  it('part2', () => {
    expect(day.partTwo('')).toBe('')
  })
})