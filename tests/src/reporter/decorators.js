const chalk = require(
    `chalk`,
);

const decorateOutput = (
    {
        color, footer, header, output,
    },
) => {

    const colorize = chalk[ color ];

    const content = output.map(
        (
            line,
        ) => {

            if ( line == null ) {

                return colorize(
                    `┠─`,
                );

            }

            const verticalBar = colorize(
                `┃`,
            );
            return `${ verticalBar } ${ line }`;

        },
    );

    return [
        colorize(
            header,
        ),
        ...content,
        colorize(
            footer,
        ),
    ];

};

const decorateErrorOutput = (
    {
        output,
    },
) => {

    return decorateOutput(
        {
            color : `red`,
            footer: `┗━━━━━━━━━━━━━━━`,
            header: `┏━ ERROR ━━━━━━━`,
            output,
        },
    );

};

const decorateSuccessOutput = (
    {
        output,
    },
) => {

    return decorateOutput(
        {
            color : `green`,
            footer: `┗━━━━━━━━━━━━━━━`,
            header: `┏━ SUCCESS ━━━━━`,
            output,
        },
    );

};

const decorateUnstableOutput = (
    {
        output,
    },
) => {

    return decorateOutput(
        {
            color : `yellow`,
            footer: `┗━━━━━━━━━━━━━━━`,
            header: `┏━ UNSTABLE ━━━━`,
            output,
        },
    );

};

module.exports = {
    decorateErrorOutput,
    decorateSuccessOutput,
    decorateUnstableOutput,
};
