import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import { ProfileData } from '../../data';
import { PageHeader } from '../../components';


function Password({...props}) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const formOptions = {
        oldPassword: {
            required: "Please enter your current password",
            minLength: { value: 8, message: "Minimum password length is 8 characters" }
        },
        newPassword1: {
            required: true,
            minLength: { value: 8, message: "Minimum password length is 8 characters" }
        },
        newPassword2: {
            required: true,
            validate: value => {
                return value === watch('newPassword1') || 'The passwords do not match'
            }
        }
    };
   
    const onPasswordSubmit = (data) => {
        ProfileData.updatePassword(data)
            .then((response) => {
                navigate('/profile/password');
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
                
                <PageHeader title="Password"></PageHeader>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="card mb-4">
                            <div className="card-body">
                               
                                <form onSubmit={handleSubmit(onPasswordSubmit, onError)} className="needs-validation">

                                    <div className="mb-3">
                                        <label htmlFor="oldPassword" className="form-label">Current password</label>
                                        <input
                                            type="password"
                                            className={
                                                cn({ 'form-control': true, 'is-invalid': errors.oldPassword })
                                            }
                                            {...register('oldPassword', formOptions.oldPassword)}
                                        />

                                        <ErrorMessage
                                            errors={errors}
                                            name="oldPassword"
                                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="newPassword1" className="form-label">New password</label>
                                        <input
                                            type="password"
                                            className={
                                                cn({ 'form-control': true, 'is-invalid': errors.newPassword1 })
                                            }
                                            {...register('newPassword1', formOptions.newPassword1)}
                                        />
                                        
                                        <ErrorMessage
                                            errors={errors}
                                            name="newPassword1"
                                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="newPassword2" className="form-label">Confirm new password</label>
                                        <input
                                            type="password"
                                            name="newPassword2"
                                            className={
                                                cn({ 'form-control': true, 'is-invalid': errors.newPassword2 })
                                            }
                                            {...register('newPassword2', formOptions.newPassword2)}
                                        />
                                        
                                        <ErrorMessage
                                            errors={errors}
                                            name="newPassword2"
                                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                        />
                                    </div>

                                    <div className="">
                                        <button type="submit" className="btn btn-primary">Save</button>
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

export default Password;