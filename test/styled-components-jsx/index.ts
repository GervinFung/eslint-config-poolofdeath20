import { describe, it, expect } from 'vitest';
import { styledComponentsJsx } from '../../src/styled-components-jsx';
import base from '../../src/base';

const testStyledComponentsJsx = () =>
    describe('styled components jsx config', () => {
        it('should assert that styled components jsx config is correct', () => {
            expect(styledComponentsJsx).toStrictEqual({
                ...base,
                plugins: [
                    ...base.plugins,
                    'jsx-a11y',
                    'styled-components-a11y',
                ],
                extends: [
                    ...base.extends,
                    'plugin:jsx-a11y/recommended',
                    'plugin:styled-components-a11y/recommended',
                ],
                rules: {
                    ...base.rules,
                    'styled-components-a11y/no-onchange': 0,
                },
            });
        });
    });

export default testStyledComponentsJsx;
