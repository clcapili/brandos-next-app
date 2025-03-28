import { useState, useEffect } from 'react';
import config from 'config';
import { requestOptions, handleResponse } from '../helpers';

function useReadUsers(accountId) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${config.apiDomain}/api/users`, requestOptions('GET', true, accountId))
            .then(response => handleResponse(response, true))
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [accountId]);

    return { data, error, loading };
}

function useReadUser(accountId, id) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${config.apiDomain}/api/users/read?${new URLSearchParams({ id: id }).toString()}`, requestOptions('GET', true, accountId))
            .then(response => handleResponse(response, true))
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [accountId]);

    return { data, error, loading };
}

function useList(accountId, ids) {
    return fetch(`${config.apiDomain}/api/users/list`, requestOptions('POST', true, accountId, {ids: ids}))
        .then(response => handleResponse(response, true));
}

function remove(accountId, id) {

    return fetch(`${config.apiDomain}/api/users/delete`, requestOptions('POST', true, accountId, {id: id}))
        .then(response => handleResponse(response));

}

export default {
    useReadUsers,
    useReadUser,
    useList,
    remove
};