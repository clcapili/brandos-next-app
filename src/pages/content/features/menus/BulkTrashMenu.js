import React from 'react';

function BulkTrashMenu({selected, doAction}) {
    return (selected && selected.length > 0 &&
        <div className="dropdown">
            <button className="btn btn-secondary btn-sm btn-bulk dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Selected ({selected.length})</button>
            <div className="dropdown-menu dropdown-menu-dark">
                <a className="dropdown-item" onClick={() => doAction('bulkRestore')}>Restore</a>
                <a className="dropdown-item text-danger" onClick={() => doAction('bulkTrash')}>Permanently Delete</a>            
            </div>
        </div>
    );
}

export default BulkTrashMenu;