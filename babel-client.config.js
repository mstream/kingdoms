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
    ],
    presets: [
        [
            '@babel/preset-env',
            {
                targets: '> 0.25%, not dead',
            },
        ],
        '@babel/preset-react',
        '@babel/preset-flow',
    ],
};
