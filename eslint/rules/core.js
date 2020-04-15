module.exports = {
    'camelcase': [
        `error`,
        {
            allow              : [],
            ignoreDestructuring: false,
            ignoreImports      : false,
            properties         : `always`,
        },
    ],
    'consistent-this': [
        `error`,
        `that`,
    ],
    'constructor-super': [
        `error`,
    ],
    'id-length': [
        `error`,
        {
            max: 64,
            min: 1,
        },
    ],
    'line-comment-position': [
        `error`,
        `above`,
    ],
    'linebreak-style': [
        `error`,
        `unix`,
    ],
    'lines-between-class-members': [
        `error`,
        `always`,
    ],
    'max-depth': [
        `error`,
        {
            max: 3,
        },
    ],
    'max-len': [
        `error`,
        {
            code    : 120,
            tabWidth: 4,
        },
    ],
    'max-lines': [
        `error`,
        {
            max           : 1000,
            skipBlankLines: true,
            skipComments  : true,
        },
    ],
    'max-lines-per-function': [
        `error`,
        {
            IIFEs         : true,
            max           : 400,
            skipBlankLines: true,
            skipComments  : true,
        },
    ],
    'max-nested-callbacks': [
        `error`,
        {
            max: 3,
        },
    ],
    'max-params': [
        `error`,
        {
            max: 3,
        },
    ],
    'max-statements': [
        `error`,
        {
            max: 50,
        },
    ],
    'max-statements-per-line': [
        `error`,
        {
            max: 1,
        },
    ],
    'multiline-ternary': [
        `error`,
        `always`,
    ],
    'no-array-constructor': [
        `error`,
    ],
    'no-bitwise': [
        `error`,
    ],
    'no-class-assign': [
        `error`,
    ],
    'no-const-assign': [
        `error`,
    ],
    'no-delete-var': [
        `error`,
    ],
    'no-dupe-class-members': [
        `error`,
    ],

    /*
     * 'no-shadow': [
     *     'error',
     * ],
     */
    'no-inline-comments': [
        `error`,
    ],
    'no-label-var': [
        `error`,
    ],

    /*
     * 'no-undefined': [
     *     'error',
     * ],
     */
    'no-mixed-operators': [
        `error`,
    ],
    'no-mixed-spaces-and-tabs': [
        `error`,
    ],

    /*
     * 'no-use-before-define': [
     *     'error',
     * ],
     */
    'no-multi-assign': [
        `error`,
    ],
    'no-negated-condition': [
        `error`,
    ],
    'no-nested-ternary': [
        `error`,
    ],
    'no-new-object': [
        `error`,
    ],
    'no-tabs': [
        `error`,
        {
            allowIndentationTabs: false,
        },
    ],
    'no-this-before-super': [
        `error`,
    ],
    'no-trailing-spaces': [
        `error`,
        {
            ignoreComments: false,
            skipBlankLines: false,
        },
    ],
    'no-undef': [
        `error`,
    ],
    'no-underscore-dangle': [
        `error`,
        {
            allow                    : [],
            allowAfterSuper          : false,
            allowAfterThis           : false,
            allowAfterThisConstructor: false,
            enforceInMethodNames     : false,
        },
    ],
    'no-useless-constructor': [
        `error`,
    ],
    'prefer-numeric-literals': [
        `error`,
    ],
    'prefer-rest-params': [
        `error`,
    ],
    'require-yield': [
        `error`,
    ],
    'sort-keys': [
        `error`,
        `asc`,
        {
            caseSensitive: true,
            minKeys      : 2,
            natural      : true,
        },
    ],
    'symbol-description': [
        `error`,
    ],

};
