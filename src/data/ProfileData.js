import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useUserProfile() {
    
    const url = `${config.apiDomain}/api/profile`;

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

function updateGeneral(data) {
    let formData = {
        firstName: data.firstName,
        lastName: data.lastName
    }
   
    return fetch(`${config.apiDomain}/api/profile/general/update`, requestOptions('POST', true, null, formData))
        .then(response => handleResponse(response));
}

function updatePhoto(data) {

    if (!data.photo.item(0)) {
        return Promise.reject(new Error('no file'));
    }

    let formData = new FormData();
    formData.append('photo', data.photo.item(0));

    return fetch(`${config.apiDomain}/api/profile/photo/update`, requestOptions('POST', true, null, formData))
        .then(response => handleResponse(response));
}

function removePhoto() {

    let formData = new FormData();

    return fetch(`${config.apiDomain}/api/profile/photo/remove`, requestOptions('POST', true, null, formData))
        .then(response => handleResponse(response));
}

function updatePassword(data) {
    let formData = {
        oldPassword: data.oldPassword,
        newPassword1: data.newPassword1,
        newPassword2: data.newPassword2
    }

    return fetch(`${config.apiDomain}/api/profile/password/update`, requestOptions('POST', true, null, formData))
        .then(response => handleResponse(response));
}

export default {
    useUserProfile,
    updateGeneral,
    updatePhoto,
    removePhoto,
    updatePassword
};