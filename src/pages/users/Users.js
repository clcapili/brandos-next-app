import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { PageHeader, Loader, Confirm } from '../../components';
import { UserData, GroupData } from '../../data';
import { getProfilePhoto } from '../../helpers';

function Users() {
    const [account] = useOutletContext();
    const [users, setUsers] = useState(null);
    const [groups, setGroups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupFilter, setGroupFilter] = useState(0);
    const [searchFilter, setSearchFilter] = useState('');
    const [filter, setFilter] = useState(null);

    const { data: userData, loading: userLoading, error: userError } = UserData.useReadUsers(account.id);
    const { data: groupsData, loading: groupsLoading, error: groupsError } = GroupData.useFindAll(account.id);

    useEffect(() => {
        setLoading(userLoading && groupsLoading);
        setUsers(userData);
        setGroups(groupsData);

        if (userError) {
            setError(userError);
        }

    }, [userData, userLoading, userError]);

    useEffect(() => {
        setLoading(userLoading && groupsLoading);
        setGroups(groupsData);

        if (groupsError) {
            setError(groupsError);
        }

    }, [groupsData, groupsLoading, groupsError])

    const onRemove = (id, index) => {
        UserData.remove(account.id, id)
            .then((response) => {
                setUsers(users.filter((v, i) => i !== index));
            });
    };

    let filteredUsers = users;
    if (users) {
        filteredUsers = users.filter((user) => JSON.parse((user.groups).includes(groupFilter) || groupFilter == 0) && (user.firstName.includes(searchFilter) || user.lastName.includes(searchFilter)));
    }
 
    return (
        <div className="main-content">
            <div className="container">
                <PageHeader
                    title="Users"
                    link={{text: 'Add', href: `/${account.id}/users/invite`, classes: 'btn btn-primary'}}
                ></PageHeader>
                
                <div className="form-search mb-3">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <select name="group" className="form-select" onChange={(event) => setGroupFilter(event.target.value)}>
                                    <option value="0">All Groups</option>
                                    {groups && groups.map((group, index) => (
                                        <option value={group.id} key={index}>{group.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <input type="search" id="userSearch" name="s" className="form-control search-query" placeholder="Search"></input>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-outline-primary btn-block" type="button" name="filter" onClick={() => setSearchFilter(document.getElementById('userSearch').value)}>Filter</button>
                        </div>
                    </div>
                </div>
                
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
                                    <div className="col-2"></div>
                                    <div className="col-3">Group</div>
                                    <div className="col-action"></div>
                                </div>

                                {filteredUsers.map((user, index) => {
                                    return (    
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
                                            
                                            <div className="col-2">
                                                {user.owner ? 'OWNER' : ''}
                                            </div>
                                            
                                            <div className="col-3">
                                                <span className="badge rounded-pill text-bg-secondary me-1 mb-1">
                                                    <Group groups={groups} user={user}></Group>
                                                </span>
                                            </div>
                                            
                                            <div className="col-action">
                                                {user.owner ?
                                                    <i className="glyph glyph-lock"></i>
                                                    :
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
                                                                <Confirm className="dropdown-item text-danger" title="Remove user?" body="This will remove the user permanently?" onSubmit={() => onRemove(user.id, index)}>Remove</Confirm>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )}
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Group({groups, user}) {
    if (!groups || !user) return <></>;

    const userGroups = JSON.parse(user.groups);
    let groupNames = [];

    userGroups.forEach((group) => {
        groupNames.push(groups.filter(g => g.id == parseInt(group))[0].name);
    })

    return (
        <>
            {groupNames.map((group, index) => (
                <div key={index}>{group}</div>
            ))}
        </>
    );
}

export default Users;