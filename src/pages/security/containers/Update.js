import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import ContainerData from '../../../data/ContainerData';
import { Security } from '../../../helpers';
import { PageHeader, Loader } from '../../../components';

const formOptions = {
    name: {
        required: "Please enter in a valid container name",
        maxLength: { 
            value: 255, 
            message: "Container should be less than 255 characters"
        }
    },
    key: {
        required: "Please enter in a valid container key",
        maxLength: { 
            value: 255, 
            message: "Container should be less than 255 characters" 
        },
        validate: {
            hasUpper: (value) => !/.*[A-Z].*/.test(value) ,
            hasSpaces: (value) => /^\S*$/.test(value)
        }
    },
    permissions: {
        required: "At least one permission is required"
    }
};

function Update() {
    const [account] = useOutletContext();
    const { id } = useParams();
    const { data: container, loading, error } = ContainerData.useFind(account.id, id);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }  } = useForm();

    const onContainerSubmit = (data, event) => {
        ContainerData.update(account.id, data)
            .then(() => {
                navigate(`/${account.id}/security/containers`);
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
                <PageHeader title="Update Container"></PageHeader>
                
                {loading && <Loader></Loader>}
                
                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                {container &&
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onContainerSubmit, onError)}  className="needs-validation">
                                        <div className="mb-3">
                                            <input
                                                type="hidden"
                                                defaultValue={ container.id }
                                                {...register('id')}
                                            />
                                            
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input 
                                                    type="text" 
                                                    id="name"
                                                    defaultValue={ container.name }
                                                    className={cn({"form-control": true, "is-invalid": errors.name})}
                                                    name="name"
                                                    {...register("name", formOptions.name)}
                                                />
                                        
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="name"
                                                    render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                                />
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label htmlFor="key" className="form-label">Key</label>
                                                <input 
                                                    type="text" 
                                                    id="key"
                                                    defaultValue={ container.key }
                                                    className={cn({"form-control": true, "is-invalid": errors.key})}
                                                    name="key"
                                                    {...register("key", formOptions.key)}
                                                />
                                            
                                                {errors.key && errors.key.type === 'hasUpper' && <div className="invalid-feedback">Container keys must be lowercase</div>}
                                                {errors.key && errors.key.type === 'hasSpaces' && <div className="invalid-feedback">Container keys cannot have spaces</div>}

                                                <ErrorMessage
                                                    errors={errors}
                                                    name="key"
                                                    render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                                />
                                            </div>

                                            <div>
                                                <label className="form-label">Permissions Allowed</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input 
                                                    type="checkbox"
                                                    id="manage"
                                                    className="form-check-input"
                                                    value={Security.Permission.MANAGE}
                                                    defaultChecked={container.permissions.indexOf(Security.Permission.MANAGE) != -1}
                                                    {...register('permissions', formOptions.permissions)}
                                                />
                                                <label htmlFor="manage" className="form-check-label">Manage</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input 
                                                    type="checkbox"
                                                    id="read"
                                                    className="form-check-input"
                                                    value={Security.Permission.READ}
                                                    defaultChecked={container.permissions.indexOf(Security.Permission.READ) != -1}
                                                    {...register('permissions', formOptions.permissions)}
                                                />
                                                <label htmlFor="read" className="form-check-label">Read</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input 
                                                    type="checkbox"
                                                    id="write"
                                                    className="form-check-input"
                                                    value={Security.Permission.WRITE}
                                                    defaultChecked={container.permissions.indexOf(Security.Permission.WRITE) != -1}
                                                    {...register('permissions', formOptions.permissions)}
                                                />
                                                <label htmlFor="write" className="form-check-label">Write</label>
                                            </div>
                                            
                                            <div className={cn({"is-invalid": errors.permissions})}></div>
                                            <ErrorMessage
                                                errors={errors}
                                                name="permissions"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>

                                        <div className="">
                                            <button type="submit" className="btn btn-primary">SAVE</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Update;