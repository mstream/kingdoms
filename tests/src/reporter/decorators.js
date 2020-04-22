const chalk = require(
    `chalk`,
);

const repeatCharacter = (
    {
        character, times,
    },
) => {

    return [
        ...Array(
            times,
        )
            .keys(),
    ].map(
        () => {

            return character;

        },
    )
        .join(
            ``,
        );

};

const decorateOutput = (
    {
        color, title, output, width,
    },
) => {

    const footerPartCenter = repeatCharacter(
        {
            character: `━`,
            times    : Math.max(
                0,
                width - 2,
            ),
        },
    );

    const footer = `┗${ footerPartCenter }┛`;

    const headerPartCenter = repeatCharacter(
        {
            character: `━`,
            times    : Math.max(
                0,
                width - title.length - 5,
            ),
        },
    );

    const header = `┏━ ${ title } ${ headerPartCenter }┓`;

    const separatorPartCenter = repeatCharacter(
        {
            character: `─`,
            times    : Math.max(
                0,
                width - 2,
            ),
        },
    );

    const separator = `┠${ separatorPartCenter }┨`;
    const colorize = chalk[ color ];

    const content = output.map(
        (
            line,
        ) => {

            if ( line == null ) {

                return colorize(
                    separator,
                );

            }

            const verticalBar = colorize(
                `┃`,
            );

            const spacePadding = repeatCharacter(
                {
                    character: ` `,
                    times    : Math.max(
                        0,
                        width - line.replace(

                            // eslint-disable-next-line
                        /\u001b\[.*?m/g,
                            ``,
                        ).length - 3,
                    ),
                },
            );

            const prefix = `${ verticalBar } `;

            const suffix = spacePadding.length > 0
                ? verticalBar
                : ``;

            return `${ prefix }${ line }${ spacePadding }${ suffix }`;

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
        output, width,
    },
) => {

    return decorateOutput(
        {
            color: `red`,
            output,
            title: `ERROR`,
            width,
        },
    );

};

const decorateInfoOutput = (
    {
        output, title, width,
    },
) => {

    return decorateOutput(
        {
            color: `white`,
            output,
            title,
            width,
        },
    );

};

const decorateSuccessOutput = (
    {
        output, width,
    },
) => {

    return decorateOutput(
        {
            color: `green`,
            output,
            title: `SUCCESS`,
            width,
        },
    );

};

const decorateUnstableOutput = (
    {
        output, width,
    },
) => {

    return decorateOutput(
        {
            color: `yellow`,
            output,
            title: `UNSTABLE`,
            width,
        },
    );

};

module.exports = {
    decorateErrorOutput,
    decorateInfoOutput,
    decorateSuccessOutput,
    decorateUnstableOutput,
};
