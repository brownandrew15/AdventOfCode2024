import { Day } from '../day'

export default class Day02 extends Day {
  constructor () {
    super("02");
  }

  isSafe(differences: number[]): boolean {
    
    const diffInRange = differences.map((value) => {
        const absValue = Math.abs(value);
        return (absValue <= 3) && (absValue >= 1)
      })
      .reduce((value1, value2) => value1 && value2, true);

    const positiveDirection = differences
      .map((value) => (value >= 0))
      .reduce((value1, value2) => value1 && value2, true);
    
    const negativeDirection = differences
      .map((value) => (value < 0))
      .reduce((value1, value2) => value1 && value2, true);

    const allSameDirection = positiveDirection || negativeDirection;

    return diffInRange && allSameDirection;

  }

  partOne (input: string): string {
    let lines: string[] = input.split("\n");
    const sequences: number[][] = lines.map((line) => {
      return line.split(" ").map(value => parseInt(value));
    });

    const differences: number[][] = sequences.map((sequence) => {
      let difference = [];
      for (let i=1; i < sequence.length; i++) {
        difference.push(sequence[i] - sequence[i-1]);
      }
      return difference;
    });
    
    const safe: number[][] = differences.filter(differencesSequence => {
      return this.isSafe(differencesSequence);
    });

    return safe.length.toString();
  }

  partTwo (input: string): string {
    return "";
  }
}