# @poolofdeath20/eslint-config

This is my eslint shareable config

What's an eslint shareable config? See [this](https://eslint.org/docs/latest/developer-guide/shareable-configs.html)

### How to use

Install via

```sh
pnpm/npm/yarn add -D @poolofdeath20/eslint-config
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

Kindly refer to [CHANGELOG](https://github.com/Packer-Man/eslint-config-poolofdeath20/blob/main/CHANGELOG.md)

### Additional information

See [ESLint configuration](http://eslint.org/docs/user-guide/configuring) for more information.
