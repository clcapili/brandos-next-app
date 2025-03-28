import React from 'react';
import { useOutletContext } from "react-router-dom";
import DomainData from '../../../data/DomainData';
import { PageHeader, Loader } from '../../../components';
import config from 'config';

function Domains() {
    const [account] = useOutletContext();
    const { data: domains, setData: setDomains, loading, error } = DomainData.useFindAll(account.id);

    const onPrimary = (id, index) => {
        DomainData.primary(account.id, id)
            .then(() => {
                setDomains(prevDomains => {
                    const updatedDomains = prevDomains.map((domain, i) => ({
                        ...domain,
                        primary: i === index
                    }));
                    return updatedDomains;
                });
            })
            .catch((error) => {
                console.log('Error setting domain as primary:', error);
            });
    };
    
    const onCheck = (id) => {
        
    }

    const onRemove = (id, index) => {
        DomainData.remove(account.id, id)
            .then(() => setDomains(domains.filter((v, i) => i !== index)))
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="main-content">
            <div className="container">

                <PageHeader 
                    title="Domains"
                    link={{text: 'Add', href: `/${account.id}/settings/domains/create`, classes: 'btn btn-primary'}}>
                </PageHeader>

                <div>
                    {loading && <Loader></Loader>}
                    
                    {error && (
                        <div>{`There is a problem fetching the data - ${error}`}</div>
                    )}

                    {domains && domains.length > 0 ?
                        <>
                            <section className="list-table">
                                <div className="list-table-row list-table-header">
                                    <div className="col col-title">Domain</div>
                                    <div className="col-2"></div>
                                    <div className="col-2 col-md-1">SSL</div>
                                    <div className="col-2 col-md-1">Status</div>
                                    <div className="col-action"></div>
                                </div>
                                    {domains.map((domain, index) =>
                                        <div key={index} className="list-table-row">
                                            <div className="col col-title">
                                                <span className="title">
                                                    {domain.serverName} {" "}
                                                </span>
                                            </div>

                                            <div className="col-2">
                                                {Boolean(domain.primary) && 
                                                    <span className="badge rounded-pill text-bg-secondary me-1 mb-1">PRIMARY</span>
                                                }
                                            </div>

                                            <div className="col-2 col-md-1">
                                                {domain.ssl == 1 &&
                                                    <i className="glyph glyph-check text-success"></i>
                                                }
                                                
                                                {domain.ssl == 0 &&
                                                    <i className="glyph glyph-close text-danger"></i>
                                                }
                                            </div>

                                            <div className="col-2 col-md-1">
                                                {domain.status == 1 &&
                                                    <i className="glyph glyph-check text-success"></i>
                                                }
                                                
                                                {domain.status == 2 &&
                                                    <i className="glyph glyph-close text-danger"></i>
                                                }
                                            </div>

                                            <div className="col-action">
                                                {(Boolean(!domain.primary) || Boolean(!domain.locked)) &&
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
                                                            {(!domain.primary) &&
                                                                <a onClick={() => onPrimary(domain.id, index)} className="dropdown-item" href="#">Set as Primary</a>
                                                            }

                                                            {(!domain.locked) &&
                                                                <a onClick={() => onCheck(domain.id)} className="dropdown-item" href="#">Check Domain</a>
                                                            }
                                                            
                                                            {(!domain.primary && !domain.locked) &&
                                                                <a onClick={() => onRemove(domain.id, index)} className="dropdown-item" href="#">Remove Domain</a>
                                                            }
                                                        </div>
                                                    </div>
                                                }

                                                {(Boolean(domain.primary) && Boolean(domain.locked)) &&
                                                    <i className="glyph glyph-lock"></i>
                                                }
                                            </div>
                                        </div>
                                    )}
                            </section>

                            <section>
                                <h4>DNS</h4>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p>
                                            Create a new CNAME record for your domain on
                                            your DNS Provider. Then, paste the CNAME Alias
                                            into the record so the domain points to your OS
                                            app.
                                        </p>
                                        <p
                                            style={{ border: "1px solid #333" }}
                                            className="alert"
                                        >
                                            {config.domainCName}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </>
                        :
                        <h3 className="text-center my-5">Domains is empty</h3>
                    }
                </div>
            </div>
        </div>
    );
}

export default Domains;