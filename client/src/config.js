// @flow


export const config = {
    cognitoSignInUrl: `${COGNITO_URL}/login?client_id=${CLIENT_ID}&response_type=token&scope=email+openid&redirect_uri=${window.location.origin}`,
    cognitoSignOutUrl: `${COGNITO_URL}/logout?client_id=${CLIENT_ID}&response_type=token&scope=email+openid&redirect_uri=${window.location.origin}`,
    wsUrl: WEB_SOCKET_URI,
};
