import { Day } from '../day'

export default class Day06 extends Day {
  constructor () {
    super("06");
  }

  createGrid(input: string): string[][] {
    return input.split("\n").map(row => row.split(''));
  }

  getStart(grid: string[][]): [number, number, string] {
    for(let row=0; row < grid.length; row++) {
      for (let col=0; col < grid[row].length; col++) {
        if (!((grid[row][col] == ".") || ((grid[row][col] == "#")))) {
          return [row, col, grid[row][col]];
        }
      }
    }
    return [-1, -1, "-"];
  }

  onGrid(grid: string[][], row: number, col: number): boolean {
    return (
      (row < grid.length) && 
      (row >= 0) && 
      (col < grid[row].length) && 
      (col >= 0)
    );
  }

  isBlocked(grid: string[][], row: number, col: number): boolean {
    if (!(this.onGrid(grid, row, col))) return false;
    return grid[row][col] == "#";
  }

  findNewPosition(row: number, col: number, direction: string): [number, number] {
    let newRow = row;
    let newCol = col;
    if (direction == "^") newRow = row - 1;
    else if (direction == ">") newCol = col + 1;
    else if (direction == "V") newRow = row + 1;
    else if (direction == "<") newCol = col - 1;
    return [newRow, newCol];
  }

  turnRight(direction: string): string {
    let newDirection = direction;
    if (direction == "^") newDirection = ">";
    else if (direction == ">") newDirection = "V";
    else if (direction == "V") newDirection = "<";
    else if (direction == "<") newDirection = "^";
    return newDirection;
  }

  findVisitedGrid(grid: string[][], startRow: number, startCol: number, direction: string): string[][] {

    let row = startRow;
    let col = startCol;

    while (this.onGrid(grid, row, col)) {

      grid[row][col] = "X";

      let [newRow, newCol] = this.findNewPosition(row, col, direction);
      let newDirection = direction;

      if (this.isBlocked(grid, newRow, newCol)) {
        newDirection = this.turnRight(direction);
      }

      if (!(direction == newDirection)) {
        [newRow, newCol] = this.findNewPosition(row, col, newDirection);
      }
      
      row = newRow;
      col = newCol;
      direction = newDirection;

      // console.log(
      //   grid.map(row => row.reduce((s, value) => s + value, "")).reduce((s, value) => s + value + "\n", "")
      // );

    }
    return grid;
  }


  partOne (input: string): string {

    const grid = this.createGrid(input);

    let [row, col, direction]  = this.getStart(grid);

    const finalGrid = this.findVisitedGrid(grid, row, col, direction);

    return finalGrid
      .map(row => {
        let visited: number[] = row
          .map(value => value == "X" ? 1 : 0)
        return visited.reduce((count, status) => count + status, 0);
      })
      .reduce((count, value) => count + value, 0)
      .toString();
  }

  partTwo (input: string): string {
    return "";
  }
}