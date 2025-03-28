import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFindAll(accountId) {
   
    const url = `${config.apiDomain}/api/settings/themes?`;

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

function useFind(accountId, id) {
  
    const url = `${config.apiDomain}/api/settings/themes/read?${new URLSearchParams({id: id}).toString()}`;

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

function useOptions(accountId, id) {
  
    const url = `${config.apiDomain}/api/settings/themes/read?${new URLSearchParams({id: id}).toString()}`;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url, requestOptions('GET', true, accountId))
            .then(response => handleResponse(response, true))
            .then(response => {
                return fetch(response.config.editor.options, {
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                        }
                    }
                )
            })
            .then(response => response.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [id]);

    return { data, error, loading };
}

function activate(accountId, id) {
    return fetch(`${config.apiDomain}/api/settings/themes/activate`, requestOptions('PUT', true, accountId, {id: id}))
        .then(response => handleResponse(response));
}

export default {
    useFindAll,
    useFind,
    useOptions,
    activate
};