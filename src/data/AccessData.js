import config from 'config';
import { useState, useEffect } from 'react';
import { requestOptions, handleResponse } from '../helpers';

function useFindAll(accountId, flatten = false) {
   
    const url = `${config.apiDomain}/api/security/access?`;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url, requestOptions('GET', true, accountId))
            .then(response => handleResponse(response, true))
            .then(response => {
                if (flatten) {
                    let list = {};

                    for (const key in response) {
                        for (let i = 0; i < response[key].length; i++) {
                            list[`${key}|${response[key][i].groupId}`] = response[key][i].permissions;
                        }
                    }

                    setData(list)
                } else {
                    setData(response)
                }
                
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { data, error, loading };
}

function update(accountId, data) {
    return fetch(`${config.apiDomain}/api/security/access/update`, requestOptions('PUT', true, accountId, data))
        .then(response => handleResponse(response, true));
}

export default {
    useFindAll,
    update
};