const executeTest = (
    {
        environment,
        mode,
    },
) => {

    return `env NODE_ENV=${ environment }`
        + ` TEST_MODE=${ mode }`
        + ` testcafe`;

};

const executeRetest = (
    {
        environment,
    },
) => {

    const testCommand = executeTest(
        {
            environment,
            mode: `retest`,
        },
    );
    const singleRetestCommand = `${ testCommand } --test $test`;
    return `while IFS= read -r test;`
        + `do ${ singleRetestCommand } || true;`
        + `done <tests/dist/${ environment }/failed-tests.txt`;

};


module.exports = {
    retest: {
        dev: {
            script: executeRetest(
                {
                    environment: `dev`,
                },
            ),
        },
        prod: {
            script: executeRetest(
                {
                    environment: `prod`,
                },
            ),
        },
    },
    test: {
        dev: {
            script: executeTest(
                {
                    environment: `dev`,
                    mode       : `test`,
                },
            ),
        },
        prod: {
            script: executeTest(
                {
                    environment: `prod`,
                    mode       : `test`,
                },
            ),
        },
    },
};
