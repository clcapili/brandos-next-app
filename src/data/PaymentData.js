import config from 'config';
import { useState, useEffect } from 'react';
import { handleResponse, requestOptions } from '../helpers';

function usePlans() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${config.apiDomain}/api/payment/plans`, requestOptions('GET', true))
            .then(response => handleResponse(response, true))
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { data, setData, error, loading };
}

function createCheckoutSession(accountId) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${config.apiDomain}/api/payment/createCheckoutSession`, requestOptions('POST', true, null, {accountId}))
            .then(response => handleResponse(response, true))
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { data, error, loading };
}

export default {
    usePlans,
    createCheckoutSession
};