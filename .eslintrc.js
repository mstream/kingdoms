const coreRules = {
    'autofix/array-bracket-newline': [
        'error',
        {
            minItems: 1,
        },
    ],
    'autofix/array-bracket-spacing': [
        'error',
        'always',
    ],
    'autofix/array-element-newline': [
        'error',
        'always',
    ],
    'autofix/arrow-body-style': [
        'error',
        'always',
    ],
    'autofix/arrow-parens': [
        'error',
        'always',
    ],
    'autofix/arrow-spacing': [
        'error',
        {
            after: true,
            before: true,
        },
    ],
    'autofix/block-spacing': [
        'error',
        'always',
    ],
    'autofix/brace-style': [
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
    'autofix/capitalized-comments': [
        'error',
        'always',
    ],
    'autofix/comma-dangle': [
        'error',
        'always',
    ],
    'autofix/comma-spacing': [
        'error',
        {
            before: false,
            after: true,
        },
    ],
    'autofix/comma-style': [
        'error',
        'last',
    ],
    'autofix/computed-property-spacing': [
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
    'autofix/eol-last': [
        'error',
        'always',
    ],
    'autofix/func-call-spacing': [
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
    'autofix/function-call-argument-newline': [
        'error',
        'always',
    ],
    'autofix/function-paren-newline': [
        'error',
        {
            minItems: 1,
        },
    ],
    'autofix/generator-star-spacing': [
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
    'autofix/implicit-arrow-linebreak': [
        'error',
        'beside',
    ],
    'autofix/indent': [
        'error',
        4,
    ],
    'autofix/jsx-quotes': [
        'error',
        'prefer-double',
    ],
    'autofix/key-spacing': [
        'error',
        {
            afterColon: true,
            align: 'colon',
            beforeColon: false,
            mode: 'minimum',
        },
    ],
    'autofix/keyword-spacing': [
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
    'autofix/lines-around-comment': [
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
    'autofix/multiline-comment-style': [
        'error',
        'starred-block',
    ],
    'multiline-ternary': [
        'error',
        'always',
    ],
    'autofix/new-parens': [
        'error',
        'always',
    ],
    'autofix/newline-per-chained-call': [
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
    'autofix/no-confusing-arrow': [
        'error',
    ],
    // 'autofix/no-console': [
    //     'error',
    // ],
    'no-const-assign': [
        'error',
    ],
    'autofix/no-debugger': [
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
    'autofix/no-multiple-empty-lines': [
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
    'autofix/no-new-symbol': [
        'error',
    ],
    'autofix/no-plusplus': [
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
    'autofix/no-undef-init': [
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
    'autofix/no-unneeded-ternary': [
        'error',
    ],
    'autofix/no-unused-vars': [
        'error',
    ],
    // 'no-use-before-define': [
    //     'error',
    // ],
    'autofix/no-useless-computed-key': [
        'error',
    ],
    'no-useless-constructor': [
        'error',
    ],
    'autofix/no-useless-rename': [
        'error',
    ],
    'autofix/no-var': [
        'error',
    ],
    'autofix/no-whitespace-before-property': [
        'error',
    ],
    'autofix/object-curly-newline': [
        'error',
        'always',
    ],
    'autofix/object-curly-spacing': [
        'error',
        'always',
    ],
    'autofix/object-property-newline': [
        'error',
        {
            allowAllPropertiesOnSameLine: false,
        },
    ],
    'autofix/object-shorthand': [
        'error',
    ],
    'autofix/one-var': [
        'error',
        'never',
    ],
    'autofix/one-var-declaration-per-line': [
        'error',
        'always',
    ],
    'autofix/operator-linebreak': [
        'error',
        'before',
    ],
    'autofix/padded-blocks': [
        'error',
        'always',
    ],
    'autofix/padding-line-between-statements': [
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
    'autofix/prefer-arrow-callback': [
        'error',
    ],
    'autofix/prefer-const': [
        'error',
    ],
    'autofix/prefer-destructuring': [
        'error',
    ],
    'autofix/prefer-exponentiation-operator': [
        'error',
    ],
    'prefer-numeric-literals': [
        'error',
    ],
    'autofix/prefer-object-spread': [
        'error',
    ],
    'prefer-rest-params': [
        'error',
    ],
    'autofix/prefer-spread': [
        'error',
    ],
    'autofix/prefer-template': [
        'error',
    ],
    'autofix/quote-props': [
        'error',
        'consistent-as-needed',
    ],
    'autofix/quotes': [
        'error',
        'backtick',
    ],
    'require-yield': [
        'error',
    ],
    'autofix/rest-spread-spacing': [
        'error',
        'never',
    ],
    'autofix/semi': [
        'error',
        'always',
    ],
    'autofix/semi-spacing': [
        'error',
        {
            after: true,
            before: false,
        },
    ],
    'autofix/semi-style': [
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
    'autofix/space-before-blocks': [
        'error',
        {
            classes: 'always',
            functions: 'always',
            keywords: 'always',
        },
    ],
    'autofix/space-before-function-paren': [
        'error',
        'always',
    ],
    'autofix/space-in-parens': [
        'error',
        'always',
    ],
    'autofix/space-infix-ops': [
        'error',
    ],
    'autofix/space-unary-ops': [
        'error',
        {
            words: true,
            nonwords: false,
        },
    ],
    'autofix/spaced-comment': [
        'error',
        'always',
    ],
    'autofix/switch-colon-spacing': [
        'error',
        {
            after: true,
            before: false,
        },
    ],
    'symbol-description': [
        'error',
    ],
    'autofix/template-curly-spacing': [
        'error',
        'always',
    ],
    'autofix/template-tag-spacing': [
        'error',
        'never',
    ],
    'autofix/unicode-bom': [
        'error',
        'never',
    ],
    'autofix/yield-star-spacing': [
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