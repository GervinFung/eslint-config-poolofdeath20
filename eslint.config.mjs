import fs from 'fs';
import process from 'process';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import { node } from '@poolofdeath20/eslint-config';
import tseslint from 'typescript-eslint';

// ref: https://github.com/import-js/eslint-plugin-import/issues/1174#issuecomment-509965883
// ref: https://github.com/import-js/eslint-plugin-import/issues/1650#issuecomment-583762684
const generatePackagesDir = () => {
	const root = process.cwd();
	const source = `${root}/packages`;

	return fs
		.readdirSync(source)
		.map((name) => {
			return `${source}/${name}`;
		})
		.concat(root);
};

export default tseslint.config(
	includeIgnoreFile(`${process.cwd()}/.gitignore`),
	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		...node,
		rules: {
			...node.rules,
			'import/no-extraneous-dependencies': [
				'error',
				{
					packageDir: generatePackagesDir(),
				},
			],
		},
	}
);
