import React from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import GroupData from '../../../data/GroupData';
import { PageHeader } from '../../../components';

const formOptions = {
    name: {
        required: "Please enter in a valid group name",
        maxLength: { value: 255, message: "Group Name should be less than 255 characters" }
    }
};

function Create() {
    const [account] = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }  } = useForm();

    const onGroupSubmit = (data, event) => {
        GroupData.create(account.id, data)
            .then(() => {
                navigate(`/${account.id}/security/groups`);
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
                <PageHeader title="Create Group"></PageHeader>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onGroupSubmit, onError)}  className="needs-validation">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className={
                                                cn({ 'form-control': true, 'is-invalid': errors.name })
                                            }
                                            name="name"
                                            {...register('name', formOptions.name)}
                                        />
                                        
                                        <ErrorMessage
                                            errors={errors}
                                            name="name"
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
            </div>
        </div>
    )
}

export default Create;