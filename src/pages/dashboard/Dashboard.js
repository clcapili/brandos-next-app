import React from 'react';
import AuthService from '../../services/AuthService';
import { useOutletContext } from "react-router-dom";
import { PageHeader } from '../../components';
import Building from './Building';
import Welcome from './widgets/Welcome';
import Storage from './widgets/Storage';
import SiteStatus from './widgets/SiteStatus';
import PublishQueue from './widgets/PublishQueue';

const TEN_MINUTES = new Date().getTime() + 600000;

function Dashboard() {
    const [account] = useOutletContext();

    const authUser = AuthService.authUser;

    return (
        <div className="main-content">
            <div className="container-lg">
                
                <PageHeader title="&nbsp;"></PageHeader>
                
                {account && isBuilding(account.created) ? <Building account={account} /> : <Widgets account={account} />}
            </div>
        </div>
    )
}

function Widgets({account}) {
    return <div className="row">     
                <div className="col-lg-12">
                    <Welcome account={account} />
                </div>
                <div className="col-lg-6">
                    <SiteStatus account={account} />
                </div>
                <div className="col-lg-6">
                    <PublishQueue account={account} />
                </div>

            </div>
}

function isBuilding(date) {
   return Date.parse(date.replace(" ", "T")) > TEN_MINUTES
}

export default Dashboard;