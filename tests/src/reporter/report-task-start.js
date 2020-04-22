const createTestModeSegment = (
    {
        testMode,
    },
) => {

    return [
        `Test mode: ${ testMode }`,
    ];

};

const createUserAgentsSegment = (
    {
        userAgents,
    },
) => {

    const userAgentLines = userAgents
        .sort()
        .map(
            (
                userAgent,
            ) => {

                return `  • ${ userAgent }`;

            },
        );

    return [
        `User agents`,
        ...userAgentLines,
    ];

};

const createReport = (
    {
        testMode,
        userAgents,
    },
) => {

    return [
        ...createTestModeSegment(
            {
                testMode,
            },
        ),
        null,
        ...createUserAgentsSegment(
            {
                userAgents,
            },
        ),
    ];

};

module.exports = {
    createReport,
};
