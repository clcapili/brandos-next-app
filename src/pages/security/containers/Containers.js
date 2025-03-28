import React from 'react';
import { useOutletContext, NavLink } from "react-router-dom";
import ContainerData from '../../../data/ContainerData';
import { Security } from '../../../helpers';
import { ReactSortable } from "react-sortablejs";
import { Loader, PageHeader } from '../../../components';

function Containers() {
    const [account] = useOutletContext();
    const { data: containers, setData: setContainers, loading, error } = ContainerData.useFindAll(account.id);

    const onRemove = (id, index) => {
        ContainerData.remove(account.id, id)
            .then(() => setContainers(containers.filter((v, i) => i !== index)))
            .catch((error) => {
                console.log(error);
            })
    }

    const onSort = () => {
        const list = [];
        for (let i = 0; i < containers.length; i++) {
            list.push(
                { 
                    id: containers[i].id,
                    sort: i + 1
                }
            );
        }

        ContainerData.sort(account.id, list);
    };
    
    return (
        <div className="main-content">
            <div className="container">
                <PageHeader 
                    title="Containers"
                    link={{text: 'Create', href: `/${account.id}/security/containers/create`, classes: 'btn btn-primary'}}>
                </PageHeader>

                <section>
                    {loading && <Loader></Loader>}
                    
                    {error && (
                        <div>{`There is a problem fetching the data - ${error}`}</div>
                    )}

                    {containers &&
                        <div className="list-table">
                            <div className="list-table-row list-table-header">
                                <div className="col-control"></div>
                                <div className="col col-title">Name</div>
                                <div className="col col-title">Key</div>
                                <div className="col col-title">Permissions</div>
                                <div className="col-action"></div>
                            </div>
                            
                            <ReactSortable 
                                tag="div"
                                list={containers} 
                                setList={setContainers}
                                animation={150}
                                handle=".drag-handle"
                                onSort={onSort}
                            >
                                {containers.map((container, index) =>
                                    <div key={container.id} className="list-table-row">
                                        <div className="col-control">
                                            <i className="glyph glyph-move drag-handle"></i>
                                        </div>

                                        <div className="col col-title">
                                            <span className="title">{container.name}</span>
                                        </div>

                                        <div className="col">
                                            {container.key}
                                        </div>

                                        <div className="col small">
                                            {container.permissions.map((permission, index2) =>
                                                <span key={index2} className="badge rounded-pill text-bg-secondary me-1 mb-1">{Security.getPermissionName(permission)}</span>
                                            )}
                                        </div>

                                        <div className="col-action">
                                            {Boolean(container.locked) ?
                                                <i className="glyph glyph-lock"></i>
                                                :
                                                <div className="dropdown">
                                                    <a className="action-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="glyph glyph-more-vert"></i>
                                                    </a>

                                                    <div className="dropdown-menu dropdown-menu-dark">
                                                        <NavLink to={`/${account.id}/security/containers/update/${container.id}`} className="dropdown-item">Edit</NavLink>
                                                        <a onClick={() => onRemove(container.id, index)} className="dropdown-item" href="#">Remove</a>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}
                                </ReactSortable>
                        </div>
                    }
                </section>
            </div>
        </div>
    )
}

export default Containers;