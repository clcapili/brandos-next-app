import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";

function useUrlParams() {
    
    const [urlParams, setUrlParams] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    
    const updateUrlParams = (updateParams) => {
        setSearchParams(prevParams => {
            const params = {...prevParams, ...updateParams}
            return Object.fromEntries(
                Object.entries(params).filter(([key, value]) => value !== '')
            );
        });
    };

    useEffect(() => {
        setUrlParams(Object.fromEntries(searchParams));
    }, [searchParams]);

    return { 
        urlParams, 
        updateUrlParams
    };
}

export default useUrlParams;
