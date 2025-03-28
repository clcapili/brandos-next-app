import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import { GroupData, InviteData } from '../../data';
import { PageHeader, Loader } from '../../components';

const formOptions = {
    email: {
        required: "Please enter in a valid email",
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
        },
    },
    groups: {
        required: "Please select one of the group options",
        message: "At least one group is required"
    },
};

function InviteUser() {
    const [account] = useOutletContext();
    const [groups, setGroups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const { data: groupsData, loading: groupsLoading, error: groupsError } = GroupData.useFindAll(account.id);

    useEffect(() => {
        setLoading(groupsLoading);
        setGroups(groupsData);

        if (groupsError) {
            setError(groupsError);
        }

    }, [groupsData, groupsLoading, groupsError]);

    function updateSelectedGroups(event) {
        const value = event.target.value;
        const checked = event.target.checked;
    
        if (checked) {
            setSelectedGroups([...selectedGroups, value]);
        } else {
            setSelectedGroups(selectedGroups.filter((group) => group != value));
        }
    }

    function validateGroups(value) {
        return value && value.length > 0 ? undefined : formOptions.groups.message;
    }    

    const onInviteSubmit = (data, event) => {
        InviteData.sendInvite(account.id, data)
            .then((response) => {
                navigate(`/${account.id}/users/invites`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    return (
        <div className="main-content">
            <div className="container">
                <PageHeader title="Invite User"></PageHeader>

                {loading && <Loader></Loader>}
                        
                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onInviteSubmit, onError)}  className="needs-validation">
                                    <div className="mb-2">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="text"
                                            id="email"
                                            className={
                                                cn({ 'form-control': true, 'is-invalid': errors.email })
                                            }
                                            name="email"
                                            {...register('email', formOptions.email)}
                                        />
                                        
                                        <ErrorMessage
                                            errors={errors}
                                            name="email"
                                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        {groups && groups.map((group, index) => (
                                            <div className="form-check" key={index}>
                                                <input
                                                    id={`group${group.id}`}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="groups[]"
                                                    value={group.id}
                                                    {...register('groups', { required: false, onChange: (event) => updateSelectedGroups(event), validate: validateGroups})}
                                                />

                                                <label htmlFor={`group${group.id}`} className="form-check-label">{group.name}</label>
                                            </div>
                                        ))}

                                        <div className={cn({"is-invalid": errors.groups})}></div>
                                        <ErrorMessage
                                            errors={errors}
                                            name="groups"
                                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                        />
                                    </div>

                                    <div className="">
                                        <button type="submit" className="btn btn-primary">Send Invite</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InviteUser;