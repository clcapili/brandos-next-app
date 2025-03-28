import React from 'react';
import { useOutletContext, Link } from "react-router-dom";
import MenuData from '../../../data/MenuData';
import { PageHeader, Loader } from '../../../components';

function Menus() {
    const [account] = useOutletContext();
    const { data: menus, setData: setMenus, loading, error } = MenuData.useFindAll(account.id);
   
    const onRemove = (id, index) => {
        MenuData.remove(account.id, id)
            .then(() => setMenus(menus.filter((v, i) => i !== index)))
            .catch((error) => {
                console.log(error);
            })
    }
   
    return (
        <div className="main-content">
            <div className="container">
                <PageHeader 
                    title="Menus"
                    link={{text: 'New Menu', href: `/${account.id}/settings/menus/create`, classes: 'btn btn-primary'}}>
                </PageHeader>

                <section>
                    {loading && <Loader></Loader>}
                    
                    {error && (
                        <div>{`There is a problem fetching the data - ${error}`}</div>
                    )}

                    {menus && menus.length > 0 ?
                        <>
                            <div className="list-table">
                                <div className="list-table-row list-table-header">
                                    <div className="col col-title">Name</div>
                                </div>

                                {menus.map((menu, index) =>
                                    <div key={index} className="list-table-row">
                                        <div className="col col-title">
                                            <Link to={`/${account.id}/settings/menus/update/${menu.id}`} className="title">{menu.name}</Link>
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
                                                    <Link to={`/${account.id}/settings/menus/update/${menu.id}`} className="dropdown-item">Edit</Link>
                                                    <a onClick={() => onRemove(menu.id, index)} className="dropdown-item" href="#">Remove</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                        :
                        <h3 className="text-center my-5">Menus is empty</h3>
                    }
                </section>
            </div>

        </div>
       
    )
}

export default Menus;