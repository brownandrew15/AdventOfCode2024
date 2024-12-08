import { Day } from './../day'
import Day06 from './day'

describe('On Day 06', () => {
  let day: Day;

  const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

  beforeEach(() => {
    day = new Day06();
  })

  it('part1', () => {
    expect(day.partOne(input)).toBe('41')
  })
  it('part2', () => {
    expect(day.partTwo('')).toBe('')
  })
})