const CircularDependencyPlugin = require(
    `circular-dependency-plugin`,
);

const HtmlWebPackPlugin = require(
    `html-webpack-plugin`,
);

const postCssTailwindCssPlugin = require(
    `tailwindcss`,
);

const postCssImportPlugin = require(
    `postcss-import`,
);

const MiniCssExtractPlugin = require(
    `mini-css-extract-plugin`,
);

const PurgecssPlugin = require(
    `purgecss-webpack-plugin`,
);

const MinimizeFontsPlugin = require(
    `../plugins/minimize-fonts-plugin`,
);

const glob = require(
    `glob`,
);

const path = require(
    `path`,
);

const utils = require(
    `../utils`,
);

const exclusions = [
    /coverage\//,
    /dist\//,
    /node_modules\//,
];

const createClientConfig = (
    {
        env,
        globalVariablesCreator,
        mode,
        projectPath,
    },
) => {

    const circularDependencyPlugin = new CircularDependencyPlugin(
        {
            allowAsyncCycles: false,
            cwd             : process.cwd(),
            exclude         : /node_modules/,
            failOnError     : true,
        },
    );

    const definePlugin = utils.createDefinitionPlugin(
        {
            globalVariablesCreator,
        },
    );

    const htmlMainPageIndexPlugin = new HtmlWebPackPlugin(
        {
            chunks: [
                `main`,
            ],
            favicon : `./client/src/assets/images/favicon.ico`,
            filename: `./index.html`,
            template: `./client/src/assets/html/index.html`,
        },
    );

    const htmlWorldPageIndexPlugin = new HtmlWebPackPlugin(
        {
            chunks: [
                `world`,
            ],
            favicon : `./client/src/assets/images/favicon.ico`,
            filename: `./world.html`,
            template: `./client/src/assets/html/index.html`,
        },
    );

    const htmlErrorPagePlugin = new HtmlWebPackPlugin(
        {
            chunks  : [],
            favicon : `./client/src/assets/images/favicon.ico`,
            filename: `./error.html`,
            template: `./client/src/assets/html/error.html`,
        },
    );

    const miniCssExtractPlugin = new MiniCssExtractPlugin(
        {
            filename: `[name].css`,
        },
    );

    const minimizeFontsPlugin = new MinimizeFontsPlugin();

    const purgeCssPlugin = new PurgecssPlugin(
        {
            defaultExtractor: (
                content,
            ) => {

                return content.match(
                    /[\w-/:]+(?<!:)/g,
                ) || [];

            },
            paths: glob.sync(
                `${ path.join(
                    projectPath,
                    `client/src`,
                ) }/**/*`,
                {
                    nodir: true,
                },
            ),
        },
    );

    return {
        entry: {
            main : `./client/src/pages/main/index.js`,
            world: `./client/src/pages/world/index.js`,
        },

        mode,

        module: {
            rules: [
                {
                    exclude: exclusions,
                    loader : `babel-loader`,
                    options: {
                        configFile: `./babel-client.config.js`,
                    },
                    test: /\.(js|jsx)$/,
                },
                {
                    exclude: exclusions,
                    loader : `file-loader`,
                    test   : /\.(ani|bmp|cur|ico|png|svg|ttf|woff2)$/i,
                },
                {
                    exclude: exclusions,
                    test   : /\.css$/,
                    use    : [
                        MiniCssExtractPlugin.loader,
                        `css-loader`,
                        {
                            loader : `postcss-loader`,
                            options: {
                                ident  : `postcss`,
                                plugins: [
                                    postCssImportPlugin,
                                    postCssTailwindCssPlugin(
                                        `./client/tailwind.config.js`,
                                    ),
                                ],
                            },
                        },
                    ],
                },
            ],
        },

        output: {
            path: `${ projectPath }/client/dist/${ env }`,
        },
        plugins: [
            definePlugin,
            purgeCssPlugin,
            miniCssExtractPlugin,
            htmlErrorPagePlugin,
            htmlMainPageIndexPlugin,
            htmlWorldPageIndexPlugin,
            minimizeFontsPlugin,
            circularDependencyPlugin,
        ],
    };

};

module.exports = createClientConfig;
