module.exports = {
    plugins: [
        [
            'flow-runtime',
            {
                optInOnly: true,
            },
        ],
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
