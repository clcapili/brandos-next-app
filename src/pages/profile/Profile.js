import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import { ProfileData } from '../../data';
import { PageHeader } from '../../components';
import AuthService from '../../services/AuthService';

const formOptions = {
    firstName: {
        required: "Please enter in a valid first name",
        maxLength: { value: 255, message: "First name should be less than 255 characters" }
    },
    lastName: {
        required: "Please enter in a valid last name",
        maxLength: { value: 255, message: "Last name should be less than 255 characters" }
    }
};

function General() {
    const [profile] = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onGeneralSubmit = (data, event) => {
        ProfileData.updateGeneral(data)
            .then((response) => {
                AuthService.authUser.name = response.firstName + ' ' + response.lastName;
                AuthService.update(AuthService.authUser);

                navigate('/profile');
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
                <div className="container-lg">
                  
                    <PageHeader title="Profile"></PageHeader>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-body">

                                        <form onSubmit={handleSubmit(onGeneralSubmit, onError)} className="needs-validation">
                                            <div className="mb-3">
                                                <label htmlFor="firstName" className="form-label">First name</label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    defaultValue={profile.firstName}
                                                    className={
                                                        cn({ 'form-control': true, 'is-invalid': errors.firstName })
                                                    }
                                                    {...register('firstName', formOptions.firstName)}
                                                />
                                        
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="firstName"
                                                    render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="lastName" className="form-label">Last name</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    defaultValue={profile.lastName}
                                                    className={
                                                        cn({ 'form-control': true, 'is-invalid': errors.lastName })
                                                    }
                                                    {...register('lastName', formOptions.lastName)}
                                                />
                                        
                                              
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="lastName"
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

export default General;