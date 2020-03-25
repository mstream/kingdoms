// @flow


export const signUp = async (
    {
        clientId,
        exec,
        password,
        region,
        username,
    }: {
        clientId: string,
        exec: (string) => Promise<void>,
        password: string,
        region: string,
        username: string,
    },
): Promise<?Error> => {
    const options = `--region ${region} --client-id ${clientId} --username ${username} --password ${password}`;
    return await exec(`aws cognito-idp sign-up ${options}`);
};


export const confirmSignUp = async (
    {
        exec,
        username,
        userPoolId,
    }: {
        exec: (string) => Promise<void>,
        username: string,
        userPoolId: string,
    },
): Promise<void> => {
    const options = `--user-pool-id ${userPoolId} --username ${username}`;
    return await exec(`aws cognito-idp admin-confirm-sign-up ${options}`);
};