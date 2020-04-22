const verror = require(
    `verror`,
);

const testMode = process.env.TEST_MODE;

if ( ![
    `test`,
    `retest`,
].includes(
    testMode,
) ) {

    throw new verror.VError(
        {
            name: `UI_TEST`,
        },
        `invalid test mode: ${ testMode }`,
    );

}

module.exports = {
    testMode,
};
