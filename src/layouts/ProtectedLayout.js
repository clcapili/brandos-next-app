import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthService from '../services/AuthService';
import __ from '@foragefox/doubledash';

const ProtectedLayout = () => {
    const location = useLocation();

    const authUser = AuthService.authUser;
    if (__.lang.isEmpty(authUser) || __.lang.isEmpty(authUser.jwt) ) {
        console.log('No auth at protected layout level');
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" replace={true} state={{ from: location }} />
    }

    return <>
        <Outlet />
    </>;
}

export default ProtectedLayout;
