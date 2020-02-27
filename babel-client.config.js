module.exports = {
    babelrcRoots: ['.', 'client', 'common'],
    plugins: ['flow-runtime', '@babel/plugin-transform-block-scoping'],
    presets: [
        '@babel/preset-env',
        '@babel/preset-flow',
        '@babel/preset-react'
    ],
};
