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
    let differences = [];
    for (let i=1; i < sequence.length; i++) {
      differences.push(sequence[i] - sequence[i-1]);
    }
    return differences;
  }

  withoutElementAtIndex(array: number[], index: number): number[] {
    return array.filter((value, arrayIndex) => {
      return index !== arrayIndex;
    });
  }

  couldBeMadeSafe(sequence: number[]): boolean {
    for(let i=0; i < sequence.length; i++) {
      const levelRemovedSequence = this.withoutElementAtIndex(sequence, i);
      const differences = this.findDifferences(levelRemovedSequence);
      const safe: boolean = this.isSafe(differences);
      if (safe) {
        return true;
      }
    }
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

    const notSafe = sequences.filter(sequence => {
      const differences = this.findDifferences(sequence);
      return !this.isSafe(differences);
    });

    const safeCount = sequences.length - notSafe.length;

    const couldBeSafe = notSafe.filter(sequence => this.couldBeMadeSafe(sequence));

    return (safeCount + couldBeSafe.length).toString();
  }
}