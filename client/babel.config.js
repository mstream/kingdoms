module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: '> 0.25%, not dead'
            },
        ],
        '@babel/preset-flow',
        '@babel/preset-react',
    ],
};