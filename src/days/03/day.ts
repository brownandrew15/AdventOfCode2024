import { Day } from '../day'

export default class Day03 extends Day {
  constructor () {
    super("03");
  }

  partOne (input: string): string {

    const re = /mul\(\d+,\d+\)/g;
    const matches = input.match(re);

    let commands: string[] = [];

    if (matches) {
      commands = matches;
    }
    
    const values = commands.map((value) => {
      const re = /\d+/g;
      const matches = value.match(re);
      const left = parseInt(matches![0]);
      const right = parseInt(matches![1]);
      return left * right;
    });

    return values.reduce((value1, value2) => value1 + value2, 0).toString();
  }

  partTwo (input: string): string {
    return "";
  }
}