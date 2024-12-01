import { promises, constants } from 'node:fs';
import path from 'node:path';

export class Setup {

    constructor(day) {
        this.day = day;
        this.twoCharDay = day.toString().padStart(2, "0");
        this.rootDir = process.cwd();
    }

    async run() {
        console.log(`Setting up day ${this.day}`);
        await this.createInputFile();
        await this.createPuzzleFiles();
        await this.updateIndexImports();
        console.log(`Setup complete for day ${this.day}`);
    }

    async createDirectory(dir) {
        try {
            await promises.access(dir, constants.F_OK | constants.W_OK);
        } catch {
            console.log(` - Creating directory: ${dir}`);
            await promises.mkdir(dir);
        }
    }

    async createFileWithContent(name, content) {
        try {
            await promises.access(name, constants.R_OK);
            console.log(` - File ${name} exists, will not overwrite.`);
        } catch {
            console.log(` - Creating file ${name}`);
            await promises.writeFile(name, content);
        }
    }
    
    async createInputFile() {
        const inputsDir = path.join(this.rootDir, 'inputs');
        this.createDirectory(inputsDir);
        this.createFileWithContent(path.join(inputsDir, `day${this.twoCharDay}.txt`), "");
    }
    
    async copyPuzzleTemplate(from, to) {
        const templateContent = (await promises.readFile(from, {encoding: 'utf8'}));
        const fileContent = templateContent.replace(/0/g, this.twoCharDay);
        this.createFileWithContent(to, fileContent);
    }
    
    async createPuzzleFiles() {
        const templateFolder = path.join(this.rootDir, 'src', 'days', 'template');
        const codeFolder = path.join(this.rootDir, 'src', 'days', `${this.twoCharDay}`);
        await this.createDirectory(codeFolder);
        await this.copyPuzzleTemplate(
            path.join(templateFolder, 'day.ts'),
            path.join(codeFolder, 'day.ts')
        );
        await this.copyPuzzleTemplate(
            path.join(templateFolder, 'day.spec.ts'),
            path.join(codeFolder, 'day.spec.ts')
        );
    }
    
    async updateIndexImports() {
        const indexPath = path.join(this.rootDir, 'src', 'index.ts');
        const contents = (await promises.readFile(indexPath, { encoding: 'utf8' }))
            .replace('// INSERT IMPORTS HERE', `import { Day${this.twoCharDay} } from './days/day${this.twoCharDay}/day';\n// INSERT IMPORTS HERE`)
            .replace('// INSERT DAYS HERE', `day${this.twoCharDay},\n\t// INSERT DAYS HERE`);
        console.log(' - Updating index');
        await promises.writeFile(indexPath, contents);
    }

}

