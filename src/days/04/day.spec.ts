import { Day } from './../day'
import Day04 from './day'

describe('On Day 04', () => {
  let day: Day;

  const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

  beforeEach(() => {
    day = new Day04();
  })

  it('part1', () => {
    expect(day.partOne(input)).toBe('18')
  })
  it('part2', () => {
    expect(day.partTwo(input)).toBe('9')
  })
})