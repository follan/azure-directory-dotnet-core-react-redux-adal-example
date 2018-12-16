import {AuthenticationContext} from 'react-adal';

const adalConfig = {
    tenant: 'TenantId',
    clientId: 'ClientId',
    endpoints: {
        api: 'EndpointApi'
    },
    postLogoutRedirectUri: window.location.origin,
    redirectUri: 'https://localhost:5001',
    cacheLocation: 'sessionStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

export function authenticateToken() {
    if (authContext.getCachedUser()) {
        // If we have a cached login, use it
        return true
    }

    if (authContext.isCallback(window.location.hash)) {
        // This happens after the AD login screen,
        // handleWindowCallback will use the hash to
        // complete the login
        authContext.handleWindowCallback();
        return true
    }

    // Not logged in
    return false
}

export const getToken = () => {
    return authContext.getCachedToken(authContext.config.clientId);
};
