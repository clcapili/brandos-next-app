import React from 'react';
import { Loader, PageHeader } from '../../../components';
import { useOutletContext, NavLink } from "react-router-dom";
import GroupData from '../../../data/GroupData';

function Groups() {
    const [account] = useOutletContext();
    const { data: groups, setData: setGroups, loading, error } = GroupData.useFindAll(account.id);
   
    const onRemove = (id, index) => {
        GroupData.remove(account.id, id)
            .then(() => setGroups(groups.filter((v, i) => i !== index)))
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="main-content">
            <div className="container">
                <PageHeader 
                    title="Groups"
                    link={{text: 'Create', href: `/${account.id}/security/groups/create`, classes: 'btn btn-primary'}}>
                </PageHeader>

                <section>
                    {loading && <Loader></Loader>}
                    
                    {error && (
                        <div>{`There is a problem fetching the data - ${error}`}</div>
                    )}

                    {groups && groups.length > 0 ?
                        <>
                            <div className="list-table">
                                <div className="list-table-row list-table-header">
                                    <div className="col col-title">Name</div>
                                </div>

                                {groups.map((group, index) =>
                                    <div key={index} className="list-table-row">
                                        <div className="col col-title">
                                            <span className="title">{group.name}</span>
                                        </div>

                                        <div className="col-action">
                                            {Boolean(group.locked) ?
                                                <i className="glyph glyph-lock"></i>
                                                :
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
                                                        <NavLink to={`/${account.id}/security/groups/update/${group.id}`} className="dropdown-item">Edit</NavLink>
                                                        <a onClick={() => onRemove(group.id, index)} className="dropdown-item" href="#">Remove</a>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                        :
                        <h3 className="text-center my-5">Groups is empty</h3>
                    }
                </section>
            </div>
        </div>
    )
}

export default Groups;