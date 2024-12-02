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

  findDifferences(sequence: number[]): number[] {
    let differences: number[] = [];
    for (let i=1; i < sequence.length; i++) {
      differences.push(sequence[i] - sequence[i-1]);
    }
    return differences;
  }

  findDerivates(differences: number[]): number[] {
    let derivatives: number[] = [];
    for (let i=1; i < differences.length; i++) {
      derivatives.push(differences[i] + differences[i-1]);
    }
    return derivatives;
  }


  couldBeMadeSafe(differences: number[]): boolean {
    let derivatives: number[] = this.findDerivates(differences);

    // check if the first index was the removed index
    let nowSafe = this.isSafe(differences.slice(1, differences.length));
    if (nowSafe) return true;

    // check the intermediate index removals
    for (let i=1; i < differences.length; i++) {
      const before = differences.slice(0, i-1);
      const after = differences.slice(i + 1, differences.length);
      const adjustedDifferences = before.concat([derivatives[i-1]], after);
      nowSafe = this.isSafe(adjustedDifferences);
      if (nowSafe) return true;
    }

    // check if the last index was the removed index
    nowSafe = this.isSafe(differences.slice(0, differences.length-1));
    if (nowSafe) return true;

    return false;
  }

  partOne (input: string): string {
    let lines: string[] = input.split("\n");
    const sequences: number[][] = lines.map((line) => {
      return line.split(" ").map(value => parseInt(value));
    });

    const safe = sequences.filter(sequence => {
      const differences = this.findDifferences(sequence);
      return this.isSafe(differences);
    });

    return safe.length.toString();
  }

  partTwo (input: string): string {
    let lines: string[] = input.split("\n");
    const sequences: number[][] = lines.map((line) => {
      return line.split(" ").map(value => parseInt(value));
    });

    const safe = sequences.filter(sequence => {
      const differences = this.findDifferences(sequence);
      return this.isSafe(differences) || this.couldBeMadeSafe(differences);
    });

    return safe.length.toString();
  }
}