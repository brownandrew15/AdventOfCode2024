import { exit } from 'node:process';
import { Setup } from './setup.js';

console.log('Advent of Code 2024');

if (process.argv.length === 2) {
    console.info(`> Usage: npm run setup {day}`);
    exit(0);
}
const day = parseInt(process.argv[2]);
if (day < 1 || day > 25) {
    console.warn('> Please enter a day between 1 and 25');
    exit(0);
}

const setup = new Setup(day);
await setup.run();
