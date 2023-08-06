import format from './sub-funciton/format';
import lint from './sub-funciton/lint';

const main = async () => {
    try {
        const args = process.argv.slice(2);

        if (args.at(0) === 'lint') {
            return await lint();
        } else if (args.at(0) === 'format') {
            const subArg = args.at(1)?.replace('--', '');

            if (subArg === 'check' || subArg === 'write') {
                return format()[subArg]();
            }
        }

        console.error(`Unknown command of ${args}`);
    } catch (error) {
        console.error(error);
    }
};

main();
