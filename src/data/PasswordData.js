import config from 'config';
import { requestOptions, handleResponse } from '../helpers';

function forgot(data) {
    return fetch(`${config.apiDomain}/api/password/forgot`, requestOptions('POST', false, null, data))
        .then(response => handleResponse(response));
}

function reset(data) {
    return fetch(`${config.apiDomain}/api/password/reset`, requestOptions('POST', false, null, data))
        .then(response => handleResponse(response));
}

export default {
    forgot,
    reset
};