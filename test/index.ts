import testCases from 'cases-of-test';
import testNode from './node';
import testReact from './react';

testCases({
    tests: [[testNode], [testReact], [testStyledComponentsJsx]],
});
