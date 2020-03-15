module.exports = {
    babelrcRoots: ['.', 'common'],
    plugins: ['flow-runtime', '@babel/plugin-transform-block-scoping'],
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: '10.16',
                },
            },
        ],
        '@babel/preset-flow',
    ],
};
