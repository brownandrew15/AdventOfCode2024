import { Day } from './../day'
import Day02 from './day'

describe('On Day 02', () => {
  let day: Day;

  let input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  beforeEach(() => {
    day = new Day02();
  })

  it('part1', () => {
    expect(day.partOne(input)).toBe('2')
  })
  it('part2', () => {
    expect(day.partTwo(input)).toBe('4')
  })
})