import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import { ContentData, UserData } from '../../data';
import { Loader } from '../../components';
import ContentHeader from './features/ContentHeader';
import { datetime } from '../../helpers';

function Versions() {
    const [account] = useOutletContext();
    const { id = 0 } = useParams();
    const [users, setUsers] = useState(null);
    const [live, setLive] = useState(null);
    const [working, setWorking] = useState(null);
    const [revisions, setRevisions] = useState([]);
    const [autosaves, setAutosaves] = useState([]);

    const { data: content, loading: loading, error: error } = ContentData.useFind(account.id, id);

    useEffect(() => {

        if (content) {

            UserData.useList(account.id, getUserIds(content)).then((response) => {
                setUsers(response);
            });

            if (content.status == 1) {
                setLive(content.live);
            }
            
            if (content.sync == 0 || (content.sync == 1 && content.status != 1)) {
                setWorking(content.working);
            }

            setRevisions(content.revisions ?? []);
            setAutosaves(content.autosaves ?? []);
        } 
            
    }, [content]);

    const discardWorking = (id) => {
        ContentData.discardWorking(account.id, id)
             .then(() => {
                setWorking(null);
             })
             .catch((error) => {
                 console.log(error);
             })
     }

     const discardAutosave = (id, userId, index) => {
        ContentData.discardAutosave(account.id, id, userId)
             .then(() => {
                setAutosaves(autosaves.filter((v, i) => i !== index));
             })
             .catch((error) => {
                 console.log(error);
             })
     }

    const restoreRevision = (id, revisionNumber, index) => {
        ContentData.restoreRevision(account.id, id, revisionNumber)
            .then(() => {
                setWorking(revisions[index])
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const restoreAutosave = (id, userId, index) => {
        ContentData.restoreAutosave(account.id, id, userId)
            .then(() => {
                setWorking(autosaves[index])

                setAutosaves(autosaves.filter((v, i) => i !== index));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="main-content">
            <div className="container">
                
                {loading && <Loader></Loader>}

                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                {content && users &&
                    <>
                        <ContentHeader account={account} content={content} prefix="Versions" backLink={`/${content.accountId}/content/${content.id}`}></ContentHeader>

                        <div className="row">
                            <div className="col-lg">
                               
                                <div className="list-table mb-5">
                                
                                    <div className="list-table-row list-table-header">
                                        <div className="col col-title"></div>
                                        <div className="col-3">User</div>
                                        <div className="col-3">Date</div>
                                        <div className="col-action"></div>
                                    </div>

                                    {live &&
                                        <div className="mb-4">
                                            <div className="list-table-row">
                                                <div className="col col-title">Published</div>
                                                <div className="col col-3"><UserName user={users[live.editedBy]} /></div>
                                                <div className="col col-3">{datetime(live.editedAt)}</div>
                                                <div className="col-action">
                                                    <i className="glyph glyph-lock"></i>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    {working &&
                                        <div className="mb-4">
                                            <div className="list-table-row">
                                                <div className="col col-title">Working Draft</div>
                                                <div className="col col-3"><UserName user={users[working.editedBy]} /></div>
                                                <div className="col col-3">{datetime(working.editedAt)}</div>
                                                <div className="col-action">
                                                    <div className="dropdown">
                                                        <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" className="action-link"><i className="glyph glyph-more-vert"></i></a>
                                                        <div className="dropdown-menu dropdown-menu-dark">
                                                            <a className="dropdown-item" href={`${account.domain}/preview?id=${content.id}&type=working`} target="_blank">Preview</a>
                                                            <a className="dropdown-item" onClick={() => discardWorking(content.id)}>Discard</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    {revisions.length > 0 &&
                                        <div className="mb-4">
                                            {revisions.map((revision, index) => 
                                                <div key={index} className="list-table-row">
                                                    <div className="col col-title">Revision #{revision.revisionNumber}</div>
                                                    <div className="col col-3"><UserName user={users[revision.editedBy]} /></div>
                                                    <div className="col col-3">{datetime(revision.editedAt)}</div>
                                                    <div className="col-action">
                                                        <div className="dropdown">
                                                            <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" className="action-link"><i className="glyph glyph-more-vert"></i></a>
                                                            <div className="dropdown-menu dropdown-menu-dark">
                                                                <a className="dropdown-item" href={`${account.domain}/preview?id=${content.id}&type=revisions&revisionId=${revision.revisionNumber}`}>Preview</a>
                                                                <a className="dropdown-item" onClick={() => restoreRevision(content.id, revision.revisionNumber, index)}>Set as Working Draft</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    }

                                    {autosaves.length > 0 &&
                                        <div className="mb-4">
                                            {autosaves.map((autosave, index) => 
                                                <div key={index} className="list-table-row">
                                                    <div className="col col-title">Autosave</div>
                                                    <div className="col col-3"><UserName user={users[autosave.editedBy]} /></div>
                                                    <div className="col col-3">{datetime(autosave.editedAt)}</div>
                                                    <div className="col-action">
                                                        <div className="dropdown">
                                                            <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" className="action-link"><i className="glyph glyph-more-vert"></i></a>
                                                            <div className="dropdown-menu dropdown-menu-dark">
                                                                <a className="dropdown-item" href={`${account.domain}/preview?id=${content.id}&type=autosaves`}>Preview</a>
                                                                <a className="dropdown-item" onClick={() => restoreAutosave(content.id, autosave.editedBy, index)}>Set as Working Draft</a>
                                                                <a className="dropdown-item" onClick={() => discardAutosave(content.id, autosave.editedBy, index)}>Discard</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

function getUserIds(content) {

    let ids = [];
    ids.push(content.live.editedBy);
    ids.push(content.working.editedBy);

    for (let i = 0; i < content.revisions.length; i++)
        ids.push(content.revisions[i].editedBy);

    for (let i = 0; i < content.autosaves.length; i++)
        ids.push(content.autosaves[i].editedBy);

    return ids;
}


function UserName({user}) {
    return <>{user.firstName} {user.lastName}</>;
}

export default Versions;