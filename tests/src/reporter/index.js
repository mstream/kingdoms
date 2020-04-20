const decorators = require(
    `./decorators`,
);
const reportTestDone = require(
    `./report-test-done`,
);

const selectDecorator = (
    {
        testRunInfo,
    },
) => {

    const isError = testRunInfo.errs.length > 0;
    const isUnstable = !isError && testRunInfo.unstable;
    const isSuccess = !isError && !isUnstable;

    if (isError) {

        return decorators.decorateErrorOutput;

    }

    if (isSuccess) {

        return decorators.decorateSuccessOutput;

    }

    if (isUnstable) {

        return decorators.decorateUnstableOutput;

    }

    throw Error(
        `cannot determine appropriate decorator`,
    );

};

module.exports = () => {

    return {
        async reportFixtureStart() {
        },
        async reportTaskDone() {
        },
        async reportTaskStart() {
        },
        async reportTestDone(
            name, testRunInfo, meta,
        ) {

            try {

                const decorator = selectDecorator(
                    {
                        testRunInfo,
                    },
                );

                const errorInfos = testRunInfo.errs.map(
                    (
                        err,
                    ) => {

                        return {
                            context: err.context == null ? {} : err.context,
                            formattedError: this.formatError(
                                err,
                            ),
                        };
                    }
                );

                const output = reportTestDone.createReport(
                    {
                        errorInfos,
                        meta,
                        name,
                    },
                );

                const decoratedContent = decorator(
                    {
                        output,
                    },
                );

                decoratedContent.forEach(
                    (
                        line,
                    ) => {

                        this.write(
                            line,
                        );

                        this.newline();

                    },
                );

            } catch (error) {

                console.error(
                    error.stack,
                );

            }

        },
        async reportTestStart() {
        },
    };

};
