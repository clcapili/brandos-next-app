import config from 'config';
import React from 'react';
import { Link, Navigate } from "react-router-dom";
import { AccountData } from '../data';
import AuthService from '../services/AuthService';

function Accounts() {

    const authUser = AuthService.authUser;
    if (!authUser.accounts || authUser.accounts.length == 0) {
        return <Navigate to={'/register'} /> //Navigate to register account page
    }

    if (authUser.accounts.length == 1) {
        return <Navigate to={'/' + authUser.accounts[0]} />
    }

    const { data: accounts, loading, error } = AccountData.useFindAll();

    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6 offset-lg-4 col-lg-4">

                    {loading && (
                        <div className="accounts">A moment please...</div>
                    )}

                    {error && (
                        <div>{`There is a problem fetching the data - ${error}`}</div>
                    )}

                    {accounts && accounts.length > 0 && (
                        <div className="account-page">
                            <h3 className="text-center">Choose an account</h3>

                            <div className="card">
                                <ul className="list-group list-group-flush">
                                    {accounts.map(
                                        ({ id, name, logo }, index) => (
                                            <li className="list-group-item" key={index}>
                                                <Link to={'/' + id}>
                                                    {logo ? 
                                                        <img className="photo" height="40" width="40" src={`${config.storageDomain}${logo}`} /> :
                                                        <img className="photo" height="40" width="40" src="https://demo-2-disk.nyc3.digitaloceanspaces.com/img/company.png" />
                                                    }
                                                    <span className="name">{name}</span>
                                                    <span className="glyph-chevron-right"></span>
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}


export default Accounts;
