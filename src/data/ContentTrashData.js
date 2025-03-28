import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFindTrash(accountId) {
  
    const url = `${config.apiDomain}/api/content/read/trash`;

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

function restore(accountId, id) {
    let data = {
        id: id
    }

    return fetch(`${config.apiDomain}/api/content/untrash`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function permanentlyDelete(accountId, id) {
    let data = {
        id: id
    }

    return fetch(`${config.apiDomain}/api/content/delete`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

export default {
    useFindTrash,
    restore,
    permanentlyDelete
};