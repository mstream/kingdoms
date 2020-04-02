const webpack = require('webpack');

const createDefinitionPlugin = ({ globalVariablesCreator }) => {
    const globalVariables = globalVariablesCreator();

    const definitions = Object.keys(globalVariables).reduce(
        (definitions, name) => {
            return {
                ...definitions,
                [name]: JSON.stringify(globalVariables[name]),
            };
        },
        {},
    );

    return new webpack.DefinePlugin(definitions);
};

module.exports = {
    createDefinitionPlugin,
};
