import { Day } from './../day'
import Day03 from './day'

describe('On Day 03', () => {
  let day: Day;

  beforeEach(() => {
    day = new Day03();
  })

  it('part1', () => {
    expect(day.partOne('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))')).toBe('161')
  })
  it('part2', () => {
    expect(day.partTwo('xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))')).toBe('48')
  })
})