const coreRules = {
    'array-bracket-newline': [
        'error',
        {
            minItems: 1,
        },
    ],
    'array-bracket-spacing': [
        'error',
        'always',
    ],
    'array-element-newline': [
        'error',
        'always',
    ],
    'arrow-body-style': [
        'error',
        'always',
    ],
    'arrow-parens': [
        'error',
        'always',
    ],
    'arrow-spacing': [
        'error',
        {
            after: true,
            before: true,
        },
    ],
    'block-spacing': [
        'error',
        'always',
    ],
    'brace-style': [
        'error',
        '1tbs',
    ],
    'camelcase': [
        'error',
        {
            allow: [],
            ignoreDestructuring: false,
            ignoreImports: false,
            properties: 'always',
        },
    ],
    'capitalized-comments': [
        'error',
        'always',
    ],
    'comma-dangle': [
        'error',
        'always',
    ],
    'comma-spacing': [
        'error',
        {
            before: false,
            after: true,
        },
    ],
    'comma-style': [
        'error',
        'last',
    ],
    'computed-property-spacing': [
        'error',
        'always',
    ],
    'consistent-this': [
        'error',
        'that',
    ],
    'constructor-super': [
        'error',
    ],
    'eol-last': [
        'error',
        'always',
    ],
    'func-call-spacing': [
        'error',
        'never',
    ],
    'func-style': [
        'error',
        'expression',
        {
            allowArrowFunctions: true,
        },
    ],
    'function-call-argument-newline': [
        'error',
        'always',
    ],
    'function-paren-newline': [
        'error',
        {
            minItems: 1,
        },
    ],
    'generator-star-spacing': [
        'error',
        {
            after: true,
            before: false,
        },
    ],
    'id-length': [
        'error',
        {
            min: 1,
            max: 64,
        },
    ],
    'implicit-arrow-linebreak': [
        'error',
        'beside',
    ],
    'indent': [
        'error',
        4,
    ],
    'jsx-quotes': [
        'error',
        'prefer-double',
    ],
    'key-spacing': [
        'error',
        {
            afterColon: true,
            align: 'colon',
            beforeColon: false,
            mode: 'minimum',
        },
    ],
    'keyword-spacing': [
        'error',
        {
            after: true,
            before: true,
        },
    ],
    'line-comment-position': [
        'error',
        'above',
    ],
    'linebreak-style': [
        'error',
        'unix',
    ],
    'lines-around-comment': [
        'error',
        {
            afterBlockComment: false,
            beforeBlockComment: true,
            afterLineComment: false,
            beforeLineComment: true,
            allowBlockStart: true,
            allowBlockEnd: true,
            allowObjectStart: true,
            allowObjectEnd: true,
            allowArrayStart: true,
            allowArrayEnd: true,
            allowClassStart: true,
            allowClassEnd: true,
            applyDefaultIgnorePatterns: false,
            ignorePattern: '',
        },
    ],
    'lines-between-class-members': [
        'error',
        'always',
    ],
    'max-depth': [
        'error',
        {
            max: 3,
        },
    ],
    'max-len': [
        'error',
        {
            code: 140,
            tabWidth: 4,
        },
    ],
    'max-lines': [
        'error',
        {
            max: 1000,
            skipBlankLines: true,
            skipComments: true,
        },
    ],
    'max-lines-per-function': [
        'error',
        {
            max: 500,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true,
        },
    ],
    'max-nested-callbacks': [
        'error',
        {
            max: 4,
        },
    ],
    'max-params': [
        'error',
        {
            max: 3,
        },
    ],
    'max-statements': [
        'error',
        {
            max: 50,
        },
    ],
    'max-statements-per-line': [
        'error',
        {
            max: 1,
        },
    ],
    'multiline-comment-style': [
        'error',
        'starred-block',
    ],
    'multiline-ternary': [
        'error',
        'always',
    ],
    'new-parens': [
        'error',
        'always',
    ],
    'newline-per-chained-call': [
        'error',
        {
            ignoreChainWithDepth: 1,
        },
    ],
    'no-array-constructor': [
        'error',
    ],
    'no-bitwise': [
        'error',
    ],
    'no-class-assign': [
        'error',
    ],
    'no-confusing-arrow': [
        'error',
    ],
    'no-const-assign': [
        'error',
    ],
    'no-delete-var': [
        'error',
    ],
    'no-dupe-class-members': [
        'error',
    ],
    'no-inline-comments': [
        'error',
    ],
    'no-label-var': [
        'error'
    ],
    'no-mixed-operators': [
        'error',
    ],
    'no-mixed-spaces-and-tabs': [
        'error',
    ],
    'no-multi-assign': [
        'error',
    ],
    'no-multiple-empty-lines': [
        'error',
        {
            max: 2,
            maxBOF: 0,
            maxEOF: 1,
        },
    ],
    'no-negated-condition': [
        'error',
    ],
    'no-nested-ternary': [
        'error',
    ],
    'no-new-object': [
        'error',
    ],
    'no-new-symbol': [
        'error',
    ],
    'no-plusplus': [
        'error',
    ],
    // 'no-shadow': [
    //     'error',
    // ],
    'no-tabs': [
        'error',
        { allowIndentationTabs: false },
    ],
    'no-this-before-super': [
        'error',
    ],
    'no-trailing-spaces': [
        'error',
        {
            ignoreComments: false,
            skipBlankLines: false,
        },
    ],
    'no-undef': [
        'error',
    ],
    'no-undef-init': [
        'error',
    ],
    // 'no-undefined': [
    //     'error',
    // ],
    'no-underscore-dangle': [
        'error',
        {
            allow: [],
            allowAfterSuper: false,
            allowAfterThis: false,
            allowAfterThisConstructor: false,
            enforceInMethodNames: false,
        },
    ],
    'no-unneeded-ternary': [
        'error',
    ],
    'no-unused-vars': [
        'error',
    ],
    // 'no-use-before-define': [
    //     'error',
    // ],
    'no-useless-computed-key': [
        'error',
    ],
    'no-useless-constructor': [
        'error',
    ],
    'no-useless-rename': [
        'error',
    ],
    'no-var': [
        'error',
    ],
    'no-whitespace-before-property': [
        'error',
    ],
    'object-curly-newline': [
        'error',
        'always',
    ],
    'object-curly-spacing': [
        'error',
        'always',
    ],
    'object-property-newline': [
        'error',
        {
            allowAllPropertiesOnSameLine: false,
        },
    ],
    'object-shorthand': [
        'error',
    ],
    'one-var': [
        'error',
        'never',
    ],
    'one-var-declaration-per-line': [
        'error',
        'always',
    ],
    'operator-linebreak': [
        'error',
        'before',
    ],
    'padded-blocks': [
        'error',
        'always',
    ],
    'padding-line-between-statements': [
        'error',
        {
            blankLine: 'never',
            next: 'singleline-const',
            prev: 'singleline-const',
        },
        {
            blankLine: 'always',
            next: '*',
            prev: 'multiline-expression',
        },
        {
            blankLine: 'always',
            next: 'multiline-expression',
            prev: '*',
        },
        {
            blankLine: 'always',
            next: 'do',
            prev: '*',
        },
        {
            blankLine: 'always',
            next: 'for',
            prev: '*',
        },
        {
            blankLine: 'always',
            next: 'if',
            prev: '*',
        },
        {
            blankLine: 'always',
            next: 'switch',
            prev: '*',
        },
        {
            blankLine: 'always',
            next: 'try',
            prev: '*',
        },
        {
            blankLine: 'always',
            next: 'while',
            prev: '*',
        },
    ],
    'prefer-arrow-callback': [
        'error',
    ],
    'prefer-const': [
        'error',
    ],
    'prefer-destructuring': [
        'error',
    ],
    'prefer-exponentiation-operator': [
        'error',
    ],
    'prefer-numeric-literals': [
        'error',
    ],
    'prefer-object-spread': [
        'error',
    ],
    'prefer-rest-params': [
        'error',
    ],
    'prefer-spread': [
        'error',
    ],
    'prefer-template': [
        'error',
    ],
    'quote-props': [
        'error',
        'consistent-as-needed',
    ],
    'quotes': [
        'error',
        'backtick',
    ],
    'require-yield': [
        'error',
    ],
    'rest-spread-spacing': [
        'error',
        'never',
    ],
    'semi': [
        'error',
        'always',
    ],
    'semi-spacing': [
        'error',
        {
            after: true,
            before: false,
        },
    ],
    'semi-style': [
        'error',
        'last',
    ],
    // 'autofix/sort-imports': [
    //     'error',
    //     {
    //         ignoreCase: false,
    //         ignoreDeclarationSort: false,
    //         ignoreMemberSort: false,
    //         memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    //     },
    // ],
    'sort-keys': [
        'error',
        'asc',
        {
            caseSensitive: true,
            minKeys: 2,
            natural: true,
        },
    ],
    'space-before-blocks': [
        'error',
        {
            classes: 'always',
            functions: 'always',
            keywords: 'always',
        },
    ],
    'space-before-function-paren': [
        'error',
        'always',
    ],
    'space-in-parens': [
        'error',
        'always',
    ],
    'space-infix-ops': [
        'error',
    ],
    'space-unary-ops': [
        'error',
        {
            words: true,
            nonwords: false,
        },
    ],
    'spaced-comment': [
        'error',
        'always',
    ],
    'switch-colon-spacing': [
        'error',
        {
            after: true,
            before: false,
        },
    ],
    'symbol-description': [
        'error',
    ],
    'template-curly-spacing': [
        'error',
        'always',
    ],
    'template-tag-spacing': [
        'error',
        'never',
    ],
    'unicode-bom': [
        'error',
        'never',
    ],
    'yield-star-spacing': [
        'error',
        {
            after: true,
            before: false,
        },
    ],

};

const flowtypeRules = {
    'flowtype/generic-spacing': [
        'error',
        'always',
    ],
};

module.exports = {
    env: {
        'browser': true,
        'es6': true,
        'node': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:flowtype/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:react/recommended',
        'plugin:testcafe/recommended',
    ],
    globals: {
        'Atomics': 'readonly',
        'CLIENT_ID': 'readonly',
        'COGNITO_URL': 'readonly',
        'LOGGING_LEVEL': 'readonly',
        'SharedArrayBuffer': 'readonly',
        'WEB_SOCKET_URL': 'readonly',
    },
    overrides: [
        {
            files: ['tests/**'],
            rules: {
                'jest/expect-expect': 'off',
                'jest/no-test-callback': 'off',
            },
        },
    ],
    parser: 'babel-eslint',
    parserOptions: {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    plugins: [
        'autofix',
        'flowtype',
        'import',
        'jest',
        'react',
        'testcafe',
    ],
    rules: {
        ...coreRules,
        ...flowtypeRules,
    },
};