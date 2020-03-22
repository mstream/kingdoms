module.exports = {
    babelrcRoots: ['.', 'tools'],
    plugins: [
        [
            'flow-runtime',
            {
                optInOnly: true,
            },
        ],
        '@babel/plugin-transform-block-scoping',
    ],
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
