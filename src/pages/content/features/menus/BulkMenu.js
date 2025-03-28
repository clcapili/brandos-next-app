import React from 'react';


function BulkMenu({selected, doAction}) {
   
    return (selected && selected.length > 0 &&
        <div className="dropdown">
            <button className="btn btn-secondary btn-sm btn-bulk dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Selected ({selected.length})</button>
            <div className="dropdown-menu dropdown-menu-dark">
                <a className="dropdown-item disabled">Update Tags</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={() => doAction('bulkCopy')}>Copy</a>
                <a className="dropdown-item" onClick={() => doAction('bulkTrash')}>Delete</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item disabled">Download</a>
            </div>
        </div>
    );
}

export default BulkMenu;