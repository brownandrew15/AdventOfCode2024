import { Day } from './days/day';
import Day01 from './days/01/day';
import Day02 from './days/02/day';
import Day03 from './days/03/day';
import Day04 from './days/04/day';
import Day05 from './days/05/day';
import Day06 from './days/06/day';
// INSERT IMPORTS HERE

const days: { new(): Day }[] = [
	Day01,
	Day02,
	Day03,
	Day04,
	Day05,
	Day06,
	// INSERT DAYS HERE
];

async function runDay (dayId: number) {
  const day = new days[dayId]();
  const part1 = await day.solvePartOne();
  console.log('Part 1 result:', part1.result, `\nExecution time: ${part1.timing} ms`, '\n');

  const part2 = await day.solvePartTwo();
  console.log('Part 2 result:', part2.result, `\nExecution time: ${part2.timing} ms`);
}

async function run (params: string[]) {
  if (params.length === 1) {
    const day = parseInt(params[0], 10);
    console.log(`ADVENT OF CODE: Day ${day}\n`);
    await runDay(day - 1);
    return;
  }

  console.log('Usage: npm run start [day]');
  console.log(`Available days: [ ${days.map((x) => (new x()).number).join(', ')} ]`);
}

run(process.argv.splice(2));