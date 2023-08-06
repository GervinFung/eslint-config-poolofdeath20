import fs from 'fs';
import path from 'path';
import { ESLint } from 'eslint';

const getAllFilesToLint = (
    directory: Readonly<{
        toRead: string;
        toIgnore: ReadonlyArray<string>;
    }>
): Array<string> => {
    return fs.readdirSync(directory.toRead).flatMap((file) => {
        const filePath = path.posix.join(directory.toRead, file);
        if (fs.statSync(filePath).isDirectory()) {
            return directory.toIgnore.find((extension) => {
                return file.endsWith(extension);
            })
                ? []
                : getAllFilesToLint({
                      ...directory,
                      toRead: filePath,
                  });
        }

        return !['js', 'ts', 'tsx'].find((extension) => {
            return file.endsWith(extension);
        })
            ? []
            : [filePath];
    });
};

const lint = async () => {
    try {
        const eslint = new ESLint();

        const results = await eslint.lintFiles(
            getAllFilesToLint({
                toRead: process.cwd(),
                toIgnore: fs
                    .readFileSync('.gitignore', { encoding: 'utf-8' })
                    .replace('**', '')
                    .split('\n')
                    .filter(Boolean),
            })
        );

        const formatter = await eslint.loadFormatter('stylish');

        const resultText = await formatter.format(results);

        console.log(resultText || 'All Good');
    } catch (error) {
        console.error(error);
    }
};

lint();
