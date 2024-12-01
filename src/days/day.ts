import fs from 'fs'

export abstract class Day {
  number: string

  protected constructor (number: string) {
    this.number = number;
  }


  async getInput() {
    return await fs.promises.readFile(`./inputs/day${this.number}.txt`)
  }

  async solvePartOne (): Promise<{ result: string, timing: number }> {
    const content = await this.getInput();
    const start = Date.now()
    const result = this.partOne(content.toString())
    const end = Date.now()
    return {
      result,
      timing: end - start
    }
  }

  abstract partOne (input: string): string;

  async solvePartTwo (): Promise<{ result: string, timing: number }> {
    const content = await this.getInput();
    const start = Date.now()
    const result = this.partTwo(content.toString())
    const end = Date.now()

    return {
      result,
      timing: end - start
    }
  }

  abstract partTwo (input: string): string;
}