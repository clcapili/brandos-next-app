import React from 'react';
import { ReactSortable } from "react-sortablejs";
import { Loader } from '../../../components';
import ContentRow from './ContentRow';
import BulkMenu from './menus/BulkMenu';

function ContentTable({ account, clipboard, selected, isSelectedAll, children, setChildren, loading, error, doAction }) {

    return (
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
                        <div className="col-2">Status</div>
                        <div className="col-action col-bulk">
                            <BulkMenu selected={selected} doAction={doAction}></BulkMenu>
                        </div>
                    </div>

                    <ReactSortable 
                        list={children} 
                        setList={setChildren}
                        animation={150}
                        onSort={() => doAction('sort')}
                    >
                        {children.map((content, index) =>
                            <ContentRow key={content.id} index={index} account={account} content={content} clipboard={clipboard} selected={selected} doAction={doAction}></ContentRow>
                        )}
                    </ReactSortable>
                </>
                :
                <h3 className="text-center my-5">No children found</h3>
            }
        </div>
    );
}

export default ContentTable;