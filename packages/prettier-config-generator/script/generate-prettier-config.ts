import fs from 'fs';
import path from 'path';

const main = () => {
	const config = fs.readFileSync('../../.prettierrc', { encoding: 'utf-8' });

	const code = [
		'const config = ',
		config,
		'as const;\n',
		'export default config',
	];

	fs.writeFileSync(path.join('src', 'prettier-config.ts'), code.join(''));
};

main();
