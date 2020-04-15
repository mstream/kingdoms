module.exports = {
    'autofix/array-bracket-newline': [
        `error`,
        {
            minItems: 1,
        },
    ],
    'autofix/array-bracket-spacing': [
        `error`,
        `always`,
    ],
    'autofix/array-element-newline': [
        `error`,
        `always`,
    ],
    'autofix/arrow-body-style': [
        `error`,
        `always`,
    ],
    'autofix/arrow-parens': [
        `error`,
        `always`,
    ],
    'autofix/arrow-spacing': [
        `error`,
        {
            after : true,
            before: true,
        },
    ],
    'autofix/block-spacing': [
        `error`,
        `always`,
    ],
    'autofix/brace-style': [
        `error`,
        `1tbs`,
    ],
    'autofix/capitalized-comments': [
        `error`,
        `always`,
    ],
    'autofix/comma-dangle': [
        `error`,
        `always`,
    ],
    'autofix/comma-spacing': [
        `error`,
        {
            after : true,
            before: false,
        },
    ],
    'autofix/comma-style': [
        `error`,
        `last`,
    ],
    'autofix/computed-property-spacing': [
        `error`,
        `always`,
    ],
    'autofix/eol-last': [
        `error`,
        `always`,
    ],
    'autofix/func-call-spacing': [
        `error`,
        `never`,
    ],
    'autofix/function-call-argument-newline': [
        `error`,
        `always`,
    ],
    'autofix/function-paren-newline': [
        `error`,
        {
            minItems: 1,
        },
    ],
    'autofix/generator-star-spacing': [
        `error`,
        {
            after : true,
            before: false,
        },
    ],
    'autofix/implicit-arrow-linebreak': [
        `error`,
        `beside`,
    ],
    'autofix/indent': [
        `error`,
        4,
    ],
    'autofix/jsx-quotes': [
        `error`,
        `prefer-double`,
    ],
    'autofix/key-spacing': [
        `error`,
        {
            afterColon : true,
            align      : `colon`,
            beforeColon: false,
            mode       : `minimum`,
        },
    ],
    'autofix/keyword-spacing': [
        `error`,
        {
            after : true,
            before: true,
        },
    ],
    'autofix/lines-around-comment': [
        `error`,
        {
            afterBlockComment         : false,
            afterLineComment          : false,
            allowArrayEnd             : true,
            allowArrayStart           : true,
            allowBlockEnd             : true,
            allowBlockStart           : true,
            allowClassEnd             : true,
            allowClassStart           : true,
            allowObjectEnd            : true,
            allowObjectStart          : true,
            applyDefaultIgnorePatterns: false,
            beforeBlockComment        : true,
            beforeLineComment         : true,
            ignorePattern             : ``,
        },
    ],
    'autofix/multiline-comment-style': [
        `error`,
        `starred-block`,
    ],
    'autofix/new-parens': [
        `error`,
        `always`,
    ],
    'autofix/newline-per-chained-call': [
        `error`,
        {
            ignoreChainWithDepth: 1,
        },
    ],
    'autofix/no-confusing-arrow': [
        `error`,
    ],
    'autofix/no-debugger': [
        `error`,
    ],
    'autofix/no-multiple-empty-lines': [
        `error`,
        {
            max   : 2,
            maxBOF: 0,
            maxEOF: 1,
        },
    ],
    'autofix/no-new-symbol': [
        `error`,
    ],
    'autofix/no-plusplus': [
        `error`,
    ],
    'autofix/no-undef-init': [
        `error`,
    ],

    /*
     * 'autofix/no-console': [
     *     'error',
     * ],
     */
    'autofix/no-unneeded-ternary': [
        `error`,
    ],
    'autofix/no-unused-vars': [
        `error`,
    ],
    'autofix/no-useless-computed-key': [
        `error`,
    ],
    'autofix/no-useless-rename': [
        `error`,
    ],
    'autofix/no-var': [
        `error`,
    ],
    'autofix/no-whitespace-before-property': [
        `error`,
    ],
    'autofix/object-curly-newline': [
        `error`,
        `always`,
    ],
    'autofix/object-curly-spacing': [
        `error`,
        `always`,
    ],
    'autofix/object-property-newline': [
        `error`,
        {
            allowAllPropertiesOnSameLine: false,
        },
    ],
    'autofix/object-shorthand': [
        `error`,
    ],
    'autofix/one-var': [
        `error`,
        `never`,
    ],
    'autofix/one-var-declaration-per-line': [
        `error`,
        `always`,
    ],
    'autofix/operator-linebreak': [
        `error`,
        `before`,
    ],
    'autofix/padded-blocks': [
        `error`,
        `always`,
    ],
    'autofix/padding-line-between-statements': [
        `error`,
        {
            blankLine: `never`,
            next     : `singleline-const`,
            prev     : `singleline-const`,
        },
        {
            blankLine: `always`,
            next     : `*`,
            prev     : `multiline-block-like`,
        },
        {
            blankLine: `always`,
            next     : `multiline-block-like`,
            prev     : `*`,
        },
        {
            blankLine: `always`,
            next     : `*`,
            prev     : `multiline-expression`,
        },
        {
            blankLine: `always`,
            next     : `multiline-expression`,
            prev     : `*`,
        },
        {
            blankLine: `always`,
            next     : `do`,
            prev     : `*`,
        },
        {
            blankLine: `always`,
            next     : `for`,
            prev     : `*`,
        },
        {
            blankLine: `always`,
            next     : `if`,
            prev     : `*`,
        },
        {
            blankLine: `always`,
            next     : `switch`,
            prev     : `*`,
        },
        {
            blankLine: `always`,
            next     : `try`,
            prev     : `*`,
        },
        {
            blankLine: `always`,
            next     : `while`,
            prev     : `*`,
        },
    ],
    'autofix/prefer-arrow-callback': [
        `error`,
    ],
    'autofix/prefer-const': [
        `error`,
    ],
    'autofix/prefer-destructuring': [
        `error`,
    ],
    'autofix/prefer-exponentiation-operator': [
        `error`,
    ],
    'autofix/prefer-object-spread': [
        `error`,
    ],
    'autofix/prefer-spread': [
        `error`,
    ],
    'autofix/prefer-template': [
        `error`,
    ],
    'autofix/quote-props': [
        `error`,
        `consistent-as-needed`,
    ],
    'autofix/quotes': [
        `error`,
        `backtick`,
    ],
    'autofix/rest-spread-spacing': [
        `error`,
        `never`,
    ],
    'autofix/semi': [
        `error`,
        `always`,
    ],
    'autofix/semi-spacing': [
        `error`,
        {
            after : true,
            before: false,
        },
    ],
    'autofix/semi-style': [
        `error`,
        `last`,
    ],
    'autofix/space-before-blocks': [
        `error`,
        {
            classes  : `always`,
            functions: `always`,
            keywords : `always`,
        },
    ],
    'autofix/space-before-function-paren': [
        `error`,
        `always`,
    ],
    'autofix/space-in-parens': [
        `error`,
        `always`,
    ],
    'autofix/space-infix-ops': [
        `error`,
    ],
    'autofix/space-unary-ops': [
        `error`,
        {
            nonwords: false,
            words   : true,
        },
    ],
    'autofix/spaced-comment': [
        `error`,
        `always`,
    ],
    'autofix/switch-colon-spacing': [
        `error`,
        {
            after : true,
            before: false,
        },
    ],
    'autofix/template-curly-spacing': [
        `error`,
        `always`,
    ],
    'autofix/template-tag-spacing': [
        `error`,
        `never`,
    ],
    'autofix/unicode-bom': [
        `error`,
        `never`,
    ],
    'autofix/yield-star-spacing': [
        `error`,
        {
            after : true,
            before: false,
        },
    ],
    'sort-imports-es6-autofix/sort-imports-es6': [
        `error`,
        {
            ignoreCase           : false,
            ignoreMemberSort     : false,
            memberSyntaxSortOrder: [
                `none`,
                `all`,
                `multiple`,
                `single`,
            ],
        },
    ],
};
