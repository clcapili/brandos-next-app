import React from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterData } from '../../data';
import cn from "classnames";

function RegisterInvite(props) {
    const navigate = useNavigate();
    const { search } = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const searchParams = new URLSearchParams(search);

    const onSubmit = (data, event) => {
        RegisterData.registerInvite(data)
            .then((payload) => {
                navigate('/' + payload.accountId);
            })
            .catch((err) => {
                
            })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6 offset-lg-4 col-lg-4">
                    
                    <div className="login-page">
                        <h3 className="text-center">Signup</h3>
                        <div className="card bg-light mb-3">
                            <div className="card-body" >

                                <form onSubmit={handleSubmit(onSubmit, onError)} className="needs-validation">
                                    <input 
                                        type="hidden" 
                                        value={searchParams.get('token')}
                                        {...register('token')} 
                                    />

                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input 
                                                type="text" 
                                                id="firstName"
                                                className={
                                                    cn({'form-control': true, 'is-invalid': errors.firstName})
                                                } 
                                                {...register('firstName', { required: true })}
                                            />
                                        {errors.firstName?.type === 'required' && <div className="invalid-feedback">Please enter in a valid name</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input 
                                                type="text" 
                                                id="lastName"
                                                className={
                                                    cn({'form-control': true, 'is-invalid': errors.lastName})
                                                } 
                                                {...register('lastName', { required: true })}
                                            />
                                        {errors.lastName?.type === 'required' && <div className="invalid-feedback">Please enter in a valid name</div>}
                                    </div>

									<div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className={
                                                cn({'form-control': true, 'is-invalid': errors.password})
                                            } 
                                            {...register('password', { required: true })}
                                        />
                                        {errors.password?.type === 'required' && <div className="invalid-feedback">Please enter a password</div>}
                                    </div>
                                   
                                    <div className="d-grid gap-2">
										<button type="submit" className="btn btn-primary">SUBMIT</button>
									</div>

                                </form>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
        </div>
    );
}

export default RegisterInvite;