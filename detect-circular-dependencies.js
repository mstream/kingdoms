const dpdm = require(
    `dpdm`,
);

dpdm.parseDependencyTree(
    [
        `./client/src/index.js`,
        `./tools/src/index.js`,
        `./server/src/index.js`,
    ],
)
    .then(
        (
            tree,
        ) => {

            const circulars = dpdm.parseCircular(
                tree,
            );

            if ( circulars.length > 0 ) {

                console.error(
                    `circular dependencies detected`,
                );

                console.error(
                    dpdm.prettyCircular(
                        circulars,
                    ),
                );

                process.exit(
                    1,
                );

            }

            console.info(
                `no dependencies issues`,
            );

            return null;

        },
    )
    .catch(
        () => {

        },
    );
