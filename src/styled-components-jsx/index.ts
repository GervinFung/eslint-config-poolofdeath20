import base from '../base';

const styledComponentsJsx = {
    ...base,
    plugins: [...base.plugins, 'jsx-a11y', 'styled-components-a11y'],
    extends: [
        ...base.extends,
        'plugin:jsx-a11y/recommended',
        'plugin:styled-components-a11y/recommended',
    ],
    rules: {
        ...base.rules,
        'styled-components-a11y/no-onchange': 0,
    },
} as const;

export { styledComponentsJsx };
