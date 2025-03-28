import config from 'config';
import { useState, useEffect } from 'react';
import { handleResponse, requestOptions } from '../helpers';

function register(data) {
    return fetch(`${config.apiDomain}/api/register`, requestOptions('POST', false, null, data))
        .then(response => handleResponse(response, true));
}

function registerAccount(data) {
    return fetch(`${config.apiDomain}/api/register/account`, requestOptions('POST', true, null, data))
        .then(response => handleResponse(response, true));
}

function registerInvite(data) {

    return fetch(`${config.apiDomain}/api/register/invite`, requestOptions('POST', true, null, data))
        .then(response => handleResponse(response));
}

function registerBilling(data) {
    return fetch(`${config.apiDomain}/api/register/billing`, requestOptions('POST', true, null, data))
        .then(response => handleResponse(response));
}

export default {
    register,
    registerAccount,
    registerInvite,
    registerBilling
};