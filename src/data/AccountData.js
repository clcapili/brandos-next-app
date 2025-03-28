import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFindAll() {
   
    const url = `${config.apiDomain}/api/profile/accounts?`;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url, requestOptions('GET', true))
            .then(response => handleResponse(response, true))
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { data, error, loading };
}

function useFind(accountId) {
  
    const url = `${config.apiDomain}/api/account`;

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
    }, [accountId]);

    return { data, error, loading };
}

function useFindLoginSettings(serverName) {
    const url = `${config.apiDomain}/api/front/account/login-settings?`;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url + 'serverName=' + serverName, requestOptions('GET', false))
            .then(response => handleResponse(response, true))
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [serverName]);

    return { data, error, loading };
}

export default {
    useFindAll,
    useFind,
    useFindLoginSettings
};