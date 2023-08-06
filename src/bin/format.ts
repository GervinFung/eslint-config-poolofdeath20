import childProcess from 'child_process';
import path from 'path';

const format = (args: ReadonlyArray<string>) => {
    try {
        const command = `pnpm prettier --ignore-path .gitignore **${path.sep}*.{ts,json,md}`;

        const type = args.at(0);
        switch (type) {
            case '--check':
            case '--write': {
                childProcess.execSync(`${command} ${type}`, {
                    stdio: 'inherit',
                });
                break;
            }
            default: {
                console.error(`Unknown command ${args.join(' ')}`);
            }
        }
    } catch (error) {
        console.error(error);
    }
};

format(process.argv.slice(2));
