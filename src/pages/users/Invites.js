import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { GroupData, InviteData } from '../../data';
import { PageHeader, Loader } from '../../components';

function UserInvites() {
    const [account] = useOutletContext();
    const [invites, setInvites] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: groupsData, loading: groupsLoading, error: groupsError } = GroupData.useFindAll(account.id);
    const { data: inviteData, loading: inviteLoading, error: inviteError } = InviteData.useFindAll(account.id);

    useEffect(() => {
        setLoading(inviteLoading && groupsLoading);
        setInvites(inviteData);

        if (inviteError) setError(inviteError);

    }, [inviteData, inviteLoading, inviteError]);

    function onRevokeInvite(invite) {
        InviteData.revokeInvite(account.id, invite)
            .then((response) => {
                setInvites(invites.filter((v, i) => v.id !== invite.id));
            });
    }

    function onResendInvite(invite) {
        InviteData.resendInvite(account.id, invite);
    }

    return (
        <div className="main-content">
            <div className="container">
                <PageHeader
                    title="Invites"
                    link={{text: 'Add', href: `/${account.id}/users/invite`, classes: 'btn btn-primary'}}
                ></PageHeader>

                <div className="row">
                    <div className="col-lg-12">
                        {loading && <Loader></Loader>}
                        
                        {inviteError && groupsError && (
                            <div>{`There is a problem fetching the data - ${error}`}</div>
                        )}

                        {invites && groupsData && (
                            <>
                                {invites.length <= 0 ?
                                    <h3 className="text-center my-5">No invites found</h3>
                                    :
                                    <div className="list-table">
                                        <div className="list-table-row list-table-header">
                                            <div className="col col-title">Name</div>
                                            <div className="col-3">Group</div>
                                            <div className="col-action"></div>
                                        </div>

                                        {invites.map((invite, index) => {
                                            return (
                                                <div key={index} className="list-table-row">
                                                    <div className="col col-title">
                                                        <span className="title">{invite.email}</span>
                                                    </div>

                                                    <div className="col-3">
                                                        <span className="badge rounded-pill text-bg-secondary me-1 mb-1">
                                                            <Group groups={groupsData} invite={invite}></Group>
                                                        </span>
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

                                                            <ul className="dropdown-menu dropdown-menu-dark">
                                                                <li>
                                                                    <a onClick={() => onResendInvite(invite)} className="dropdown-item" href="#">Resend</a>
                                                                </li>
                                                                <li>
                                                                    <a onClick={() => onRevokeInvite(invite)} className="dropdown-item text-danger" href="#">Revoke</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        )}
                                    </div>
                                }
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Group({groups, invite}) {
    if (!groups || !invite) return <></>;

    const inviteGroups = JSON.parse(invite.groups);
    let groupNames = [];

    
    if (typeof inviteGroups != 'number') {
        inviteGroups.forEach((group) => {
            groupNames.push(groups.filter(g => g.id == parseInt(group))[0].name);
        })    
    } else {
        groupNames = [groups.filter(g => g.id == parseInt(inviteGroups))[0].name];
    }

    return (
        <>
            {groupNames.map((group, index) => (
                <div key={index}>{group}</div>
            ))}
        </>
    );
}

export default UserInvites;