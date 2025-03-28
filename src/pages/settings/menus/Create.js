import React from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import MenuData from '../../../data/MenuData';
import { PageHeader, PathInput } from '../../../components';

const formOptions = {
    name: {
        required: "Please enter in a valid menu name",
        maxLength: { value: 255, message: "Menu Name should be less than 255 characters" }
    }
};

function Create() {
    const [account] = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control  } = useForm();

    const onMenuSubmit = (data, event) => {
        MenuData.create(account.id, data)
            .then(() => {
                navigate(`/${account.id}/settings/menus`);
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
                <PageHeader title="Create Menu"></PageHeader>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onMenuSubmit, onError)}  className="needs-validation">
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
                                        <button type="submit" className="btn btn-primary">CREATE</button>
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