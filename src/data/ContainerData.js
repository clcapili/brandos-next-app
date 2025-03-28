import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFindAll(accountId) {
   
    const url = `${config.apiDomain}/api/security/containers?`;

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
  
    const url = `${config.apiDomain}/api/security/containers/read?${new URLSearchParams({id: id}).toString()}`;

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

    return { data, error, loading };
}

function create(accountId, data) {
    return fetch(`${config.apiDomain}/api/security/containers/create`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function update(accountId, data) {
    return fetch(`${config.apiDomain}/api/security/containers/update`, requestOptions('PUT', true, accountId, data))
        .then(response => handleResponse(response));
}

function remove(accountId, id) {
    let data = {
        id: id
    }

    return fetch(`${config.apiDomain}/api/security/containers/delete`, requestOptions('DELETE', true, accountId, data))
        .then(response => handleResponse(response));
}

function sort(accountId, data) {
    return fetch(`${config.apiDomain}/api/security/containers/sort`, requestOptions('PUT', true, accountId, data))
        .then(response => handleResponse(response, true));
}

export default {
    useFindAll,
    useFind,
    create,
    update,
    remove,
    sort
};