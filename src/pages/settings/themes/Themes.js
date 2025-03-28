import React from 'react';
import { Loader, PageHeader } from '../../../components';
import { Link, useOutletContext } from "react-router-dom";
import ThemeData from '../../../data/ThemeData';

export const THEME_STATUS = {
    1: 'DRAFT',
    2: 'UNDER REVIEW',
    3: 'PUBLISHED'
};

function Themes() {
    const [account] = useOutletContext();
    const { data, error, loading } = ThemeData.useFindAll(account.id);

    const onActivate = (id) => {
        ThemeData.activate(account.id, id)
            .then(() => {})
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="main-content">
            <div className="container">
                <PageHeader 
                    title="Themes">
                </PageHeader>

                <section>
                    {loading && <Loader></Loader>}
                    
                    {error && (
                        <div>{`There is a problem fetching the data - ${error}`}</div>
                    )}

                    {data && data.length > 0 ?
                        <>
                            <div className="row">
                                {data.map(theme =>
                                    <div key={theme.id} className="col-md-6 col-lg-4">
                                        <div className="card">
                                            <img className="card-img-top" src={theme.thumbnail} />
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <h4 className="card-title mb-0">{theme.name}</h4>
                                                        {account.themeId == theme.id ? <small className="text-primary-emphasis">ACTIVE</small> : <small>&nbsp;</small>}
                                                    </div>
                                                    <div className="col text-end">
                                                        {
                                                            account.themeId != theme.id ? 
                                                            <button className="btn btn-sm btn-outline-primary" onClick={() => onActivate(theme.id)}>Activate</button>
                                                            : 
                                                            <Link className="link-underline link-underline-opacity-0 text-gray-600" to={`/${account.id}/settings/themes/${theme.id}`}>&nbsp;<i className="glyph-settings"></i></Link>
                                                        }

                                                        {theme.status != 3 ? <><br /><small className="badge text-bg-dark">{THEME_STATUS[theme.status]}</small></> : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                        :
                        <h3 className="text-center my-5">No themes found</h3>
                    }
                </section>
            </div>
        </div>
    )
}

export default Themes;