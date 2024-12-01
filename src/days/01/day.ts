import { Day } from '../day'

export default class Day01 extends Day {
  constructor () {
    super("01");
  }


  processFile(input: string): {columns: number[][], lineCount: number} {
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

    return {
      columns: columns,
      lineCount: lineCount
    };
  }

  partOne (input: string): string {
    const file = this.processFile(input);
    const columns = file.columns;
    const lineCount = file.lineCount;


    columns[0] = columns[0].sort();
    columns[1] = columns[1].sort();

    let rows: number[][] = [];

    for (let lineNum = 0; lineNum < lineCount; lineNum++) {
      rows.push([columns[0][lineNum], columns[1][lineNum]]);
    }

    let difference = 0;

    rows.forEach((row) => {
      difference += Math.abs(row[0] - row[1]);
    })

    return difference.toString();
  }

  partTwo (input: string): string {
    const file = this.processFile(input);
    const columns = file.columns;
    const lineCount = file.lineCount;

    let similarity = 0;

    for (let lineNum = 0; lineNum < lineCount; lineNum++) {
      let lineValue: number = columns[0][lineNum];
      let lineScore: number = lineValue * columns[1].filter((value) => value == lineValue).length;
      similarity += lineScore;
    }


    return similarity.toString();
  }
}