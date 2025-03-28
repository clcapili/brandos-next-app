import AuthService from '../services/AuthService';

function authHeader(headers) {
    // return authorization header with jwt token
   
    const authUser = AuthService.authUser;
    if (authUser && authUser.jwt) {
        headers.Authorization = `Bearer ${authUser.jwt}`;
    }

    return headers;
}

function requestOptions(method, auth = false, accountId = null, data = null, headers = {}) {

    let options = {
        method: method,
        cache: 'no-cache',
        headers: { 'Accept': 'application/json' }
    };

    if (accountId) {
        options.headers['Account-Id'] = accountId;
    }

    if (auth) {
        options.headers = authHeader(options.headers);
    }

    if (data) {
        if (data instanceof FormData) {
            options.body = data;
        } else {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }
    }

    options.headers = {
        ...options.headers,
        ...headers
    };

    return options;
}


export default requestOptions;