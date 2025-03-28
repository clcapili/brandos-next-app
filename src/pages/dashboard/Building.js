import React from 'react';

function Building({account}) {
    return <div className="widget-building">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <div className=" text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="96px" viewBox="0 -960 960 960" width="96px"><path d="M600-120v-120H440v-400h-80v120H80v-320h280v120h240v-120h280v320H600v-120h-80v320h80v-120h280v320H600ZM160-760v160-160Zm520 400v160-160Zm0-400v160-160Zm0 160h120v-160H680v160Zm0 400h120v-160H680v160ZM160-600h120v-160H160v160Z"/></svg>
                            <h3>Your site is currently being built.</h3>
                            <h3>This setup process usually takes just a few moments.</h3>
                        </div>
                    </div>
                </div>
            </div>
}

export default Building;