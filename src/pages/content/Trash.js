import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import ContentTrashData from '../../data/ContentTrashData';
import { PageHeader, Loader } from '../../components';
import { CONTENT_SCHEMA } from './constants';
import BulkTrashMenu from './features/menus/BulkTrashMenu';
import ActionsTrash from './ActionsTrash';

function Trash() {
    const [account] = useOutletContext();
    const { data: children, setData: setChildren, loading, error } = ContentTrashData.useFindTrash(account.id);

    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setIsSelectedAll(false);
        setSelected([]);
    }, []);

    const doAction = (action, id, index, checked) => {
        ActionsTrash[action](account.id, {
            id, 
            children, 
            setChildren, 
            isSelectedAll, 
            setIsSelectedAll, 
            selected, 
            setSelected, 
            index, 
            checked
        });
    }
   
    const onPermanentlyDelete = (id, index) => {
        ContentTrashData.permanentlyDelete(account.id, id)
            .then(() => setChildren(children.filter((v, i) => i !== index)))
            .catch((error) => {
                console.log(error);
            })
    }

    const onRestore = (id, index) => {
        ContentTrashData.restore(account.id, id)
            .then(() => setChildren(children.filter((v, i) => i !== index)))
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="main-content cms-page">
            <div className="container-fluid">
                <PageHeader title="Trash"></PageHeader>

                <div className="row">
                    <div className="col-lg">
                        <div className="list-table mb-5">
                            {loading && <Loader></Loader>}

                            {error && (
                                <div>{`There is a problem fetching the data - ${error}`}</div>
                            )}

                            {children && children.length > 0 ?
                                <>
                                    <div className="list-table-row list-table-header">
                                        <div className="col-control">
                                            <label>
                                                <input type="checkbox" value="all" onChange={() => doAction('selectAll')} checked={isSelectedAll}  />
                                            </label>
                                        </div>
                                        <div className="col col-title"><div className="thumbnail"></div>Name</div>
                                        <div className="col-action col-bulk">
                                            <BulkTrashMenu selected={selected} doAction={doAction}></BulkTrashMenu>
                                        </div>
                                    </div>

                                    {children.map((content, index) =>
                                        <Child key={content.id} index={index} content={content} selected={selected} onPermanentlyDelete={onPermanentlyDelete} onRestore={onRestore} doAction={doAction}></Child>
                                    )}
                                </>
                                :
                                <h3 className="text-center my-5">Trash is empty</h3>
                            }
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}


function Child({ index, content, selected, onPermanentlyDelete, onRestore, doAction }) {
    const handleSelect = (event) => {
        doAction('select', parseInt(event.target.value), -1, event.target.checked);
    };

    return (
        <div className="list-table-row">
            <div className="col-control">
                <label>
                    <input type="checkbox" value={content.id} onChange={(event) => handleSelect(event)} checked={selected.includes(content.id)} />
                </label>
            </div>
            <div className="col col-title">
                <div className="thumbnail">
                    <div className="file-icon" data-type={content.icon}></div>
                </div>
                <div>
                    <div className="title">{content.name}</div>
                    <div className="subtitle">
                        {CONTENT_SCHEMA[content.schema]}
                    </div>
                </div>
            </div>
            <div className="col-action">
                <div className="dropdown">
                    <a className="action-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="glyph glyph-more-vert"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-dark">
                        <a className="dropdown-item" onClick={() => onRestore(content.id, index)}>Restore</a>
                        <a className="dropdown-item text-danger" onClick={() => onPermanentlyDelete(content.id, index)}>Permanently Delete</a>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Trash;