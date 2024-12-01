import { Day } from '../day'

export default class Day01 extends Day {
  constructor () {
    super("01");
  }

  partOne (input: string): string {
    let columns: number[][] = [[], []]

    const lines: string[] = input.split("\n");

    let lineCount = 0;

    lines.forEach((line) => {
      const pair: string[] = line.split("   ");
      const left: number = parseInt(pair[0]);
      const right: number = parseInt(pair[1]);
      columns[0].push(left);
      columns[1].push(right);
      lineCount++;
    });

    columns[0] = columns[0].sort();
    columns[1] = columns[1].sort();

    let rows: number[][] = [];

    for (let lineNum = 0; lineNum < lineCount; lineNum++) {
      rows.push([columns[0][lineNum], columns[1][lineNum]])
    }

    let difference = 0;

    rows.forEach((row) => {
      difference += Math.abs(row[0] - row[1]);
    })

    return difference.toString();
  }

  partTwo (input: string): string {
    return "";
  }
}