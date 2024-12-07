import { Day } from './../day'
import Day05 from './day'

describe('On Day 05', () => {
  let day: Day;

  let input: string = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

  beforeEach(() => {
    day = new Day05();
  })

  it('part1', () => {
    expect(day.partOne(input)).toBe('143')
  })
  it('part2', () => {
    expect(day.partTwo(input)).toBe('123')
  })
})