import fs from 'fs';
import path from 'path';
import childProcess from 'child_process';

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
            case '--generate': {
                fs.writeFileSync(
                    './.prettierrc',
                    JSON.stringify(
                        require('../../.prettierrc.json'),
                        undefined,
                        4
                    )
                );
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

export default format;
