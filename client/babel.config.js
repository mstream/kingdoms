module.exports = {
    plugins: ['@babel/plugin-transform-runtime'],
    presets: [
        [
            '@babel/preset-env',
            {
                corejs: '3',
                targets: '> 0.25%, not dead',
                useBuiltIns: 'entry',
            },
        ],
        '@babel/preset-flow',
        '@babel/preset-react',
    ],
};
