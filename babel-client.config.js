module.exports = {
    babelrcRoots: ['.', 'client', 'common'],
    plugins: [
        [
            'flow-runtime',
            {
                optInOnly: true,
            },
        ],
        '@babel/plugin-transform-block-scoping',
        '@babel/plugin-transform-runtime',
    ],
    presets: [
        [
            '@babel/preset-env',
            {
                corejs: '3',
                targets: '> 0.25%, not dead',
                useBuiltIns: 'entry',
            },
        ],
        '@babel/preset-react',
        '@babel/preset-flow',
    ],
};
