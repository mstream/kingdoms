module.exports = {
    babelrcRoots: ['.', 'client', 'common', 'server'],
    plugins: ['flow-runtime'],
    presets: [
        '@babel/preset-env',
        '@babel/preset-flow',
        '@babel/preset-react'
    ],
};
