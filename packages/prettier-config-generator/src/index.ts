import fs from 'fs';

import config from './prettier-config';

const main = () => {
	fs.writeFileSync('./.prettierrc', JSON.stringify(config, undefined, 4));
};

export default main;
