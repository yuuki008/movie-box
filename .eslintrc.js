module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "settings": {
        "react": {
          "createClass": "createReactClass", 
          "pragma": "React",  
          "fragment": "Fragment", 
          "version": "detect", 
          "flowVersion": "0.53" 
        },
        "propWrapperFunctions": [
            "forbidExtraProps",
            {"property": "freeze", "object": "Object"},
            {"property": "myFavoriteWrapper"}
        ],
        "linkComponents": [
          "Hyperlink",
          {"name": "Link", "linkAttribute": "to"}
        ]
    },    
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-function-return-type': [0],
        '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
        '@typescript-eslint/prefer-interface': [0],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
    }
};
