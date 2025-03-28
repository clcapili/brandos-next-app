import React from 'react';
import { PaymentData } from '../../data';
import { Link } from "react-router-dom";
import { Loader } from '../../components';
import cn from 'classnames';

function Plans() {
    
    const { data: plans, error, loading } = PaymentData.usePlans();

    
    return (
        <div className="container">
            <div className="plans-page">

                {loading && <Loader></Loader>}
                        
                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                <h1 className="text-center">Plans</h1>
                <div className="row justify-content-center">
                    {plans && plans.map((plan, i) => (
                            <div className={cn('col-md-4 col-xl-3 mb-3', {'free-item': plan.price == 0})} key={i}>
                                <div className="card h-100">
                                    <div className="card-header text-bg-dark">
                                        <h5>{plan.name}</h5>
                                        <h2>{plan.price != 0 ? '$'+plan.price+'/m' : 'Free'}</h2>
                                    </div>
                                    <div className="card-body">
                                        <div dangerouslySetInnerHTML={{__html: plan.features}} />
                                    </div>
                                    <div className="card-footer">
                                        {plan.price != 0 ? 
                                            <Link className="btn btn-outline-dark d-block" to={`/register/${plan.key}`}>SELECT</Link> : 
                                            <Link className="btn btn-outline-dark d-block" to="https://mblm.com/contact" target="_blank">Contact</Link>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className="row justify-content-center mb-3">
                    <div className="col-md-10 col-lg-8">
                        <ul className="list-unstyled small">
                            <li>
                                * Custom theme configuration is provided by our internal design and development team and requires addtional cost. Custom themes configuration begin at $2,000.00 USD.
                            </li>
                            <li>
                                ** Custom theme development provides a custom visual experience designed and programmed by our internal team. Custom themes development begin af $10,000.00USD.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Plans;