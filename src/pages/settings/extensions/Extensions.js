import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import ExtensionData from '../../../data/ExtensionData';
import { PageHeader, Loader } from '../../../components';

function Extensions() {
    const [account] = useOutletContext();
    const [activated, setActivated] = useState();

    const { data: extensions, loading, error } = ExtensionData.useFindAll(account.id);
    const { data: activeExtensions } = ExtensionData.useFindAllActive(account.id);

    useEffect(() => {
        if (activeExtensions)
            setActivated(activeExtensions.map(o => o.id))
    }, [activeExtensions])
    
    const onActivate = (id) => {
        ExtensionData.activate(account.id, id).then(() => {
            setActivated([...activated, id])

            
        })
        .catch((error) => {
            console.log('Error setting extension status:', error);
        });
    };
    
    const onDeactivate = (id) => {
        ExtensionData.deactivate(account.id, id).then(() => {
            setActivated(l => l.filter(item => item !== id))
        })
        .catch((error) => {
            console.log('Error setting extension status:', error);
        });
    };

    const onPurge = (id) => {
        ExtensionData.purge(account.id, id);
    };

    return (
        <div className="main-content">
            <div className="container">

                <PageHeader title="Extensions"></PageHeader>

                <div>
                    {loading && <Loader></Loader>}
                    
                    {error && (
                        <div>{`There is a problem fetching the data - ${error}`}</div>
                    )}

                    {activated && extensions && extensions.length > 0 ?
                        <section className="list-table">
                            <div className="list-table-row list-table-header">
                                <div className="col col-title">Name</div>
                                <div className="col-3">Status</div>
                                <div className="col-action"></div>
                            </div>
                                {extensions.map((extension, index) =>
                                    <div key={index} className="list-table-row">
                                        <div className="col col-title">
                                            <span className="title">{extension.name}</span>
                                        </div>

                                        <div className="col-3">
                                            {activated.includes(extension.id) ? 'ACTIVE' : 'DEACTIVE' }
                                        </div>

                                        <div className="col-action">
                                            <div className="dropdown">
                                                <a
                                                    className="action-link"
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="glyph glyph-more-vert"></i>
                                                </a>

                                                <div className="dropdown-menu dropdown-menu-dark">
                                                    {activated.includes(extension.id) ?
                                                        <a onClick={() => onDeactivate(extension.id)} className="dropdown-item">Deactivate</a>
                                                        :
                                                        <>
                                                            <a onClick={() => onActivate(extension.id)} className="dropdown-item">Activate</a>
                                                            <a onClick={() => onPurge(extension.id)} className="dropdown-item text-danger">Purge Data</a>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </section>
                    
                        :
                        <h3 className="text-center my-5">No Extensions Found</h3>
                    }
                </div>
            </div>
        </div>
    );
}

export default Extensions;