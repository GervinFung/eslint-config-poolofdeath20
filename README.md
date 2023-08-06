# @poolofdeath20/lint-format

### How to use

Install via

```sh
pnpm/npm/yarn add -D @poolofdeath20/lint-format
```

Then install along its peer dependencies

```sh
pnpm/npm/yarn add -D \
  eslint-plugin-react \
  eslint-plugin-jsx-a11y \
  eslint \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin
```

```jsonc
{
    "root": true,
    "extends": ["@poolofdeath20/eslint-config/node"],
    "rules": {
        // Additional rules as you see fit
    },
    "overrides": [
        {
            "files": ["**/*.ts"], // or ["**/*.js"]
            "rules": {
                //...rules
            }
        }
    ]
}
```

### Changes

Kindly refer to [CHANGELOG](https://github.com/GervinFung/eslint-config-poolofdeath20/blob/main/CHANGELOG.md)

### Additional information

See [ESLint configuration](http://eslint.org/docs/user-guide/configuring) for more information.
