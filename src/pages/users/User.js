import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { PageHeader, Loader, Confirm } from '../../components';
import { UserData, InviteData, GroupData } from '../../data';
import { getProfilePhoto } from '../../helpers';

function User() {
    const [account] = useOutletContext();
    const [users, setUsers] = useState(null);
    const [groups, setGroups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: userData, userLoading, userError } = UserData.useReadUsers(account.id);
    const { data: groupsData, groupsLoading, groupsError } = GroupData.useGetGroups(account.id);

    useEffect(() => {
        setUsers(userData);
        setLoading(userLoading && groupsLoading);
        setGroups(groupsData);

        if (userError) {
            setError(userError);
        }

        if (groupsError) {
            setError(groupsError);
        }
    }, [userData, userLoading, userError, groupsData, groupsLoading, groupsError]);

    const onRemove = (id, index) => {
        UserData.remove(account.id, id)
            .then((response) => {
                setUsers(users.filter((v, i) => i !== index));
            });
    };

    return (
        <div className="main-content">
            <div className="container">
                <PageHeader
                    title="Users"
                    link={{text: 'Add', href: `/${account.id}/users/invite`, classes: 'btn btn-primary'}}
                ></PageHeader>

                <div className="row">
                    <div className="col-lg-12">
                        {loading && <Loader></Loader>}
                        
                        {error && (
                            <div>{`There is a problem fetching the data - ${error}`}</div>
                        )}

                        {users && (
                            <div className="list-table">
                                <div className="list-table-row list-table-header">
                                    <div className="col col-title">Name</div>
                                    <div className="col-3">Group</div>
                                    <div className="col-action"></div>
                                </div>
                                
                                {users.map((user, index) => (
                                    <div key={user.id} className="list-table-row">
                                        <div className="col col-title">
                                            <div className="thumbnail">
                                                <img src={getProfilePhoto(user)} className="rounded-pill img-fluid" />
                                            </div>
                                            
                                            <div>
                                                <span className="title">{user.firstName} {user.lastName}</span>
                                                <div className="subtitle">{user.email}</div>
                                            </div>
                                        </div>

                                        <div className="col-3">
                                            <span className="badge rounded-pill text-bg-secondary me-1 mb-1">
                                                {user.role}
                                            </span>
                                        </div>
                                        
                                        <div className="col-action">
                                            {!user.owner &&
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

                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <Confirm className="dropdown-item text-danger" title="Remove user?" body="This will remove the user permanently?" onSubmit={() => onRemove(user.id, index)}>Remove</Confirm>
                                                        </li>
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;