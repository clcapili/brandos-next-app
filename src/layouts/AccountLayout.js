import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import AuthService from '../services/AuthService';
import NotFound from "../pages/NotFound";
import { AccountData } from '../data';
import { Navigation, Loader } from '../components';
import Checkout from '../pages/payment/Checkout';

const AccountLayout = () => {
    const { accountId } = useParams();
    
    const authUser = AuthService.authUser;
    if (!hasAccount(authUser, accountId)) {
        return <NotFound />
    }

    const { data: account, loading, error } = AccountData.useFind(accountId);

    return (
        <>
            {loading && <Loader></Loader>}

            {error && (
                <div>{`There is a problem fetching the data - ${error}`}</div>
            )}

            {account && account.action && (
                 <>
                    {account.action === 'billing' && <Checkout accountId={accountId} />}

                    {account.action === 'locked' && <Locked />}
                </>
            )}

            {account && account.action === undefined && (
                <>
                    <Navigation account={account} />
                    <Outlet context={[account]} />
                </>
            )}

            
        </>
    );
}

function hasAccount(user, accountId) {
    return user.accounts && user.accounts.indexOf(parseInt(accountId)) != -1;
}

function Locked({}) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-4">
                    <div className="card my-5">
                        <div className="card-body">
                            <h2 className="card-title">This account is Locked</h2> 
                            <p className="card-text">Please contact your admin for support.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountLayout;
