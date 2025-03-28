import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFindAll(accountId) {
   
    const url = `${config.apiDomain}/api/invites`;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url, requestOptions('GET', true, accountId))
            .then(response => handleResponse(response, true))
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { data, setData, error, loading };
}

function sendInvite(accountId, data) {
    let formData = {
        email: data.email,
        groups: data.groups
    }

    return fetch(`${config.apiDomain}/api/invites/create`, requestOptions('POST', true, accountId, formData))
        .then(response => handleResponse(response));
}

function resendInvite(accountId, invite) {
    return fetch(`${config.apiDomain}/api/invites/resend`, requestOptions('POST', true, accountId, {id: invite.id}))
        .then(response => handleResponse(response));
}

function revokeInvite(accountId, invite) {
    return fetch(`${config.apiDomain}/api/invites/revoke`, requestOptions('POST', true, accountId, {id: invite.id}))
        .then(response => handleResponse(response));
}

export default {
    sendInvite,
    useFindAll,
    resendInvite,
    revokeInvite
};