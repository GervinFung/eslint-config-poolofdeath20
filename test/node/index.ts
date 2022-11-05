import { describe, it, expect } from 'vitest';
import { node } from '../../src/node';
import base from '../../src/base';

const testNode = () =>
    describe('node config', () => {
        it('should assert that node config is correct', () => {
            expect(node).toStrictEqual(base);
        });
    });

export default testNode;
