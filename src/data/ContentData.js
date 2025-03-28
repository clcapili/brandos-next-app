import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFindAll(accountId, parentId = 0) {
   
    const url = `${config.apiDomain}/api/content?`;
   
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url + 'parentId='+parentId, requestOptions('GET', true, accountId))
            .then(response => handleResponse(response, true))
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [parentId]);

    return { data, setData, error, loading };
}

function useFind(accountId, id) {
  
    const url = `${config.apiDomain}/api/content/read?${new URLSearchParams({id: id}).toString()}`;

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

function useFindParents(accountId, parentId) {
  
    const url = `${config.apiDomain}/api/content/read/parents?${new URLSearchParams({parentId: parentId}).toString()}`;

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
    }, [parentId]);

    return { data, error, loading };
}

function useFindPending(accountId) {
  
    const url = `${config.apiDomain}/api/content/read/pending`;

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

    return { data, error, loading };
}

function create(accountId, data) {
    return fetch(`${config.apiDomain}/api/content/create`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function update(accountId, data) {
    return fetch(`${config.apiDomain}/api/content/save`, requestOptions('PUT', true, accountId, data))
        .then(response => handleResponse(response));
}

function upload(accountId, data) {
    if (!data.file && !data.thumbnail) {
        return Promise.reject(new Error('No file Selected'));
    }

    let formData = new FormData();
    formData.append('id', data.id);
    data.file && formData.append('file', data.file);
    data.thumbnail && formData.append('thumbnail', data.thumbnail);

    return fetch(`${config.apiDomain}${data.path}`, requestOptions('POST', true, accountId, formData))
        .then(response => handleResponse(response));
}

function sort(accountId, data) {
    return fetch(`${config.apiDomain}/api/content/sort`, requestOptions('PUT', true, accountId, data))
        .then(response => handleResponse(response, true));
}

function clone(accountId, id, parentId) {
    let data = {
        id: id,
        parentId: parentId
    }

    return fetch(`${config.apiDomain}/api/content/clone`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function publish(accountId, id) {
    let data = {
        id: id
    }

    return fetch(`${config.apiDomain}/api/content/publish`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function unpublish(accountId, id) {
    let data = {
        id: id
    }

    return fetch(`${config.apiDomain}/api/content/unpublish`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function trash(accountId, id) {
    let data = {
        id: id
    }

    return fetch(`${config.apiDomain}/api/content/trash`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function restoreRevision(accountId, id, revisionNumber) {
    let data = {
        id: id,
        revisionNumber: revisionNumber
    }

    return fetch(`${config.apiDomain}/api/content/useRevision`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function restoreAutosave(accountId, id, userId) {
    let data = {
        id: id,
        userId: userId
    }

    return fetch(`${config.apiDomain}/api/content/useAutosave`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function discardWorking(accountId, id) {
    let data = {
        id: id
    }

    return fetch(`${config.apiDomain}/api/content/discardWorking`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}

function discardAutosave(accountId, id, userId) {
    let data = {
        id: id,
        userId: userId
    }

    return fetch(`${config.apiDomain}/api/content/discardAutosave`, requestOptions('POST', true, accountId, data))
        .then(response => handleResponse(response));
}



export default {
    useFindAll,
    useFind,
    useFindParents,
    useFindPending,
    useFindTrash,
    create,
    update,
    upload,
    sort,
    clone,
    publish,
    unpublish,
    trash,
    restoreRevision,
    restoreAutosave,
    discardWorking,
    discardAutosave
};