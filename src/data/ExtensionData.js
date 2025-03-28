import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFindAll(accountId) {
   
    const url = `${config.apiDomain}/api/settings/extensions?`;

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

function useFindAllActive(accountId) {
   
    const url = `${config.apiDomain}/api/settings/extensions/account?`;

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

function useFind(accountId, id) {
  
    const url = `${config.apiDomain}/api/settings/extensions/read?${new URLSearchParams({id: id}).toString()}`;

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
    }, [id]);

    return { data, setData, error, loading };
}

function activate(accountId, id) {
    return fetch(`${config.apiDomain}/api/settings/extensions/activate`, requestOptions('PUT', true, accountId, { id }))
        .then(response => handleResponse(response));
}

function deactivate(accountId, id) {
    return fetch(`${config.apiDomain}/api/settings/extensions/deactivate`, requestOptions('PUT', true, accountId, { id }))
        .then(response => handleResponse(response));
}

function purge(accountId, id) {
    return fetch(`${config.apiDomain}/api/settings/extensions/purge`, requestOptions('DELETE', true, accountId, { id }))
        .then(response => handleResponse(response));
}

function update(accountId, id, page, data) {

    return fetch(`${config.apiDomain}/api/settings/extensions/update`, requestOptions('PUT', true, accountId, { id, page, data }))
        .then(response => handleResponse(response));
}

export default {
    useFindAll,
    useFindAllActive,
    useFind,
    activate,
    deactivate,
    purge,
    update
};