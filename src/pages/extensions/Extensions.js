import React from 'react';
import { Link, useOutletContext } from "react-router-dom";
import ExtensionData from '../../data/ExtensionData';
import { PageHeader, Loader } from '../../components';
import config from 'config';

function Extensions() {
    const [account] = useOutletContext();
    const { data: extensions, loading, error } = ExtensionData.useFindAllActive(account.id);

    return (
        <div className="main-content">
            <div className="container">

                <PageHeader title="Active Extensions"></PageHeader>

                <div>
                    {loading && <Loader></Loader>}
                    
                    {error && (
                        <div>{`There is a problem fetching the data - ${error}`}</div>
                    )}

                    {extensions && extensions.length > 0 ?
                        <section className="list-table">
                            <div className="list-table-row list-table-header">
                                <div className="col col-title">Name</div>
                                <div className="col-action"></div>
                            </div>
                                {extensions.map((extension, index) =>
                                    <div key={index} className="list-table-row">
                                        <div className="col col-title">
                                            <Link className="title" to={`/${account.id}/extensions/settings/${extension.id}/0`}>{extension.name}</Link>
                                        </div>
                                    </div>
                                )}
                        </section>
                    
                        :
                        <h3 className="text-center my-5">No Active Extensions</h3>
                    }
                </div>
            </div>
        </div>
    );
}

export default Extensions;