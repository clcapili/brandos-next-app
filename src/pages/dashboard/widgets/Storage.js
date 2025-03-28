import React from 'react';

function Storage({account}) {
    return  (
        <div className="card mb-3">
            <div className="card-header">Storage Usage</div>
            
            <div className="card-body text-center">
                <div className="row">
                    <div className="col-12">
                        <h2>3924.00 MB</h2>
                        <p>Total used by this environment</p>
                    </div>
                    <div className="col-6">
                        <div><strong>3246.00 MB</strong></div>
                        Files
                    </div>
                    <div className="col-6">
                        <div><strong>678.00 MB</strong></div>
                        Database
                    </div>
                </div>
        
            </div>

        </div>
    )     
            
}

export default Storage;