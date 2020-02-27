module.exports = {
    babelrcRoots: ['.', 'client', 'common'],
    plugins: ['flow-runtime', '@babel/plugin-transform-block-scoping'],
    presets: [
        [
            '@babel/preset-env',
            {
                targets: '> 0.25%, not dead'
            },
        ],
        '@babel/preset-flow',
        '@babel/preset-react'
    ],
};
