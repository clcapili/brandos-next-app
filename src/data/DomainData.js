import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFindAll(accountId) {
   
    const url = `${config.apiDomain}/api/settings/domains?`;

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

function create(accountId, data) {
    let formData = {
        domain: data.domain,
        ssl: data.ssl
    }

    return fetch(`${config.apiDomain}/api/settings/domains/create`, requestOptions('POST', true, accountId, formData))
        .then(response => handleResponse(response));
}

function primary(accountId, id) {
    let data = {
        id: id
    }

    return fetch(`${config.apiDomain}/api/settings/domains/primary`, requestOptions('PUT', true, accountId, data))
        .then(response => handleResponse(response));
}

function check(accountId, data) {
    
    const requestOptions = {
        method: 'POST',
        cache: 'no-cache',
        headers: {'Accept': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiDomain}/api/content/add`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function verify(accountId, data) {
    return fetch(`${config.apiDomain}/api/settings/domains/verify`, requestOptions('PUT', true, accountId, data))
        .then(response => handleResponse(response));
}

function remove(accountId, id) {
    let data = {
        id: id
    }

    return fetch(`${config.apiDomain}/api/settings/domains/delete`, requestOptions('DELETE', true, accountId, data))
        .then(response => handleResponse(response));
}

export default {
    useFindAll,
    create,
    primary,
    check,
    verify,
    remove
};