import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';


function useFind(accountId) {
  
    const url = `${config.apiDomain}/api/settings`;

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

function useFindLoginSettings(accountId) {
  
    const url = `${config.apiDomain}/api/settings/login`;

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

    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('defaultPage', data.defaultPage);
    formData.append('patternFolder', data.patternFolder);
    formData.append('favicon', data.favicon.item(0) ? data.favicon.item(0) : null);
    formData.append('logo', data.logo.item(0) ? data.logo.item(0) : null);

    return fetch(`${config.apiDomain}/api/settings/update`, requestOptions('POST', true, accountId, formData))
        .then(response => handleResponse(response));
}

function updateLoginSettings(accountId, data) {

    let formData = new FormData();
    formData.append('color', data.color);
    formData.append('position', data.position);
    formData.append('repeat', data.repeat);
    formData.append('size', data.size);
    formData.append('image', data.image.item(0) ? data.image.item(0) : null);
    formData.append('disableForm', data.disableForm);

    return fetch(`${config.apiDomain}/api/settings/login/update`, requestOptions('POST', true, accountId, formData))
        .then(response => handleResponse(response));
}

export default {
    useFind,
    update,
    useFindLoginSettings,
    updateLoginSettings
};