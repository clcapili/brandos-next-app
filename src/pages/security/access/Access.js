import React from 'react';
import { useOutletContext } from "react-router-dom";
import ContainerData from '../../../data/ContainerData';
import GroupData from '../../../data/GroupData';
import AccessData from '../../../data/AccessData';
import { Security } from '../../../helpers';
import { PageHeader } from '../../../components';

function Access() {
    const [account] = useOutletContext();
    const { data: containers, loading: containersLoading, error: containersError } = ContainerData.useFindAll(account.id);
    const { data: groups, loading: groupsLoading, error: groupsError } = GroupData.useFindAll(account.id);
    const { data: access, loading: accessLoading, error: accessError } = AccessData.useFindAll(account.id, true);

    const onPermissionChange = (event) => {
        let target = event.target;

        let data = {
            permissions: target.value,
            set: target.checked
        }

        AccessData.update(account.id, data);
    }

    function checkPermissions(container, groupId, permission) {
        if (!access[`${container}|${groupId}`])
            return false;
    
       return (access[`${container}|${groupId}`] & permission) == permission;
    }

    return (
        <div className="main-content">
            <div className="container">
                <PageHeader title="Access"></PageHeader>

                <div className="row">
                    <div className="col-lg-12">
                        {(containersLoading || groupsLoading || accessLoading) && (
                            <div>A moment please...</div>
                        )}
                        
                        {(containersError || groupsError || accessError) && (
                            <React.Fragment>
                                <div>{`There is a problem fetching the container data - ${containersError}`}</div>
                                <div>{`There is a problem fetching the groups data - ${groupsError}`}</div>
                                <div>{`There is a problem fetching the access data - ${accessError}`}</div>
                            </React.Fragment>
                        )}

                        {containers && groups && access && 
                            <div className="table-responsive">
                                <table id="table-2" className="table">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Security Containers</th>
                                            {groups.map((group, index) => 
                                                <th key={index} className="text-center">
                                                    {group.name}
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {containers.map((container, index) =>
                                            <React.Fragment key={index}>
                                                {container.permissions.map((permission, index2) =>
                                                    <tr key={index2}>
                                                        {index2 == 0 &&
                                                            <td rowSpan={container.permissions.length}>
                                                                <div><strong>{container.name}</strong></div>
                                                                <div className='small text-secondary'><em>{container.key}</em></div>
                                                            </td>
                                                        }

                                                        <td>
                                                            {Security.getPermissionName(permission)}
                                                        </td>

                                                        {groups.map((group, index3) => 
                                                            <td key={index3} className="table-cell-control text-center">
                                                                {group.locked && container.locked ? 
                                                                    <i className="glyph glyph-lock"></i>
                                                                    :
                                                                    <label className="custom-control-checkbox">
                                                                        <input
                                                                            onClick={(event) => onPermissionChange(event)}
                                                                            type="checkbox"
                                                                            value={`${container.key}|${group.id}|${permission}`}
                                                                            defaultChecked={checkPermissions(container.key, group.id, permission)}
                                                                            className="form-check-input custom-control-input permissions"
                                                                        />
                                                                        <span className="custom-control-indicator"></span>
                                                                    </label>
                                                                }
                                                            </td>
                                                        )}
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Access;