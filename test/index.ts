import testCases from 'cases-of-test';
import testNode from './node';
import testReact from './react';
import testStyledComponentsJsx from './styled-components-jsx';

testCases({
    tests: [[testNode], [testReact], [testStyledComponentsJsx]],
});
