import path from 'path';
import childProcess from 'child_process';

const format = () => {
    const command = `pnpm prettier --ignore-path .gitignore **${path.sep}*.{ts,json,md}`;

    return {
        write: () => {
            console.log(childProcess.execSync(`${command} --write`).toString());
        },
        check: () => {
            console.log(childProcess.execSync(`${command} --check`).toString());
        },
    };
};

export default format;
