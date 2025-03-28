import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFind(accountId) {
    const url = `${config.apiDomain}/api/settings/sections`;

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

    return { data, error, loading };
}

function update(accountId, data) {
    return fetch(`${config.apiDomain}/api/settings/sections/update`, requestOptions('PUT', true, accountId, data))
        .then(response => handleResponse(response));
}

export default {
    useFind,
    update
};