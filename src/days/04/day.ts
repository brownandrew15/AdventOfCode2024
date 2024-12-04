import { Day } from '../day'

export default class Day04 extends Day {
  constructor () {
    super("04");
  }


  getString(length: number, grid: string[][], startRow: number, startCol: number, changeRow: number, changeCol: number): string {
    const characterIndexes: number[] = [...Array(length).keys()];
    return characterIndexes.map((index) => {
      const row = startRow + (index * changeRow);
      const col = startCol + (index * changeCol);
      if ((row >= grid.length) || (row < 0)) return "";
      if ((col >= grid[row].length) || (col < 0)) return "";
      return grid[row][col];
    }).reduce((char1, char2) => char1 + char2, "");
  }

  partOne (input: string): string {
    const grid = input.split('\n').map(row => row.split(''));

    const compassDirections = [
      [-1, -1], [-1, 0], [-1, 1], 
      [0, -1], [0, 0], [0, 1],
      [1, -1], [1, 0], [1, 1]];

    let xmasCount = 0;

    for(let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] == "X") {
          const count = compassDirections.map((direction) => {
            return this.getString(4, grid, row, col, direction[0], direction[1]);
          }).map(value => value == "XMAS").reduce((count, value) => count += value ? 1 : 0, 0);
          xmasCount += count;
        }
      }
    }

    return xmasCount.toString();
  }


  isXMAS(grid: string[][], row: number, col: number): boolean {
    if ((row >= grid.length-1) || (row < 1)) return false;
    if ((col >= grid[row].length-1) || (col < 1)) return false;

    return (
      (
        (grid[row-1][col-1] == "M") && (grid[row+1][col+1] == "S") ||
        (grid[row-1][col-1] == "S") && (grid[row+1][col+1] == "M") 
      )
      &&
      (
        (grid[row+1][col-1] == "M") && (grid[row-1][col+1] == "S") ||
        (grid[row+1][col-1] == "S") && (grid[row-1][col+1] == "M") 
      )
    );
  }


  partTwo (input: string): string {
    const grid = input.split('\n').map(row => row.split(''));

    let count = 0;

    for(let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] == "A") {
          const isAnXMAS = this.isXMAS(grid, row, col);
          count += (isAnXMAS ? 1 : 0);
        }
      }
    }

    return count.toString();
  }
}