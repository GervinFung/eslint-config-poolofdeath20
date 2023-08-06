import fs from 'fs';
import path from 'path';
import * as Eslint from '@typescript-eslint/typescript-estree';

type Files = ReadonlyArray<string>;

const getCjsFiles = (dir: string): Files => {
    return fs.readdirSync(dir).flatMap((file) => {
        const filePath = `${dir}/${file}`;
        return fs.statSync(filePath).isDirectory()
            ? getCjsFiles(filePath)
            : path.extname(filePath) !== '.js'
            ? []
            : [filePath];
    });
};

const readCode = (file: string) => {
    return fs.readFileSync(file, { encoding: 'utf8' });
};

const main = () => {
    const fileAndCode = getCjsFiles('build').map((file) => {
        return {
            file,
            code: readCode(file),
        } as const;
    });

    const nodeType = Eslint.AST_NODE_TYPES;

    const getNameOfIdentifier = (
        node:
            | Eslint.TSESTree.Expression
            | Eslint.TSESTree.PrivateIdentifier
            | Eslint.TSESTree.LeftHandSideExpression
    ) => {
        switch (node.type) {
            case nodeType.Identifier: {
                return node.name;
            }
        }
    };

    fileAndCode.forEach(({ file, code }) => {
        const exportStatement = Eslint.parse(code, {
            loc: true,
        }).body.flatMap((node) => {
            switch (node.type) {
                case nodeType.ExpressionStatement: {
                    node.expression;
                    switch (node.expression.type) {
                        case nodeType.AssignmentExpression: {
                            const { left } = node.expression;
                            switch (left.type) {
                                case nodeType.MemberExpression: {
                                    const objectName = getNameOfIdentifier(
                                        left.object
                                    );
                                    const propertyName = getNameOfIdentifier(
                                        left.property
                                    );
                                    if (
                                        objectName === 'exports' &&
                                        propertyName !== 'default'
                                    ) {
                                        return [
                                            {
                                                old: `${objectName}.${propertyName}`,
                                                new: `module.${objectName}=${propertyName}`,
                                            },
                                        ];
                                    }
                                }
                            }
                        }
                    }
                }
                default: {
                    return [];
                }
            }
        });

        const newCode = code
            .replace(/\r/gm, '')
            .split('\n')
            .map((code) => {
                const found = exportStatement.find((statement) => {
                    return code.trim().startsWith(statement.old);
                });
                return !found ? code : found.new;
            })
            .join('\n');

        fs.writeFile(file, newCode, (error) => {
            error ? console.error(error) : console.log(`Done updating ${file}`);
        });
    });
};

main();
