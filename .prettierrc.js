module.exports = {
    jsxBracketSameLine: true,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    semi: false,
    printWidth: 120,
    parser: 'typescript',
    overrides: [
      {
        files: '*.json',
        options: {
          parser: 'json',
        },
      },
    ],
}