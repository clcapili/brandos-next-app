import React from 'react';
import AuthService from '../../services/AuthService';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { PasswordData } from '../../data';
import cn from "classnames";

function Reset(props) {
    const navigate = useNavigate();
    const { search } = useLocation();
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    
    const searchParams = new URLSearchParams(search);
    const authUser = AuthService.authUser;
    
    if (authUser) {
        navigate('/');
    }

    const onSubmit = (data, event) => {
        PasswordData.reset(data)
            .then((response) => {
                navigate('/');
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
                        <h3 className="text-center">Reset Your Password</h3>
                        <div className="card bg-light mb-3">
                            <div className="card-body" >

                                <form onSubmit={handleSubmit(onSubmit, onError)} className="needs-validation">
                                    <input 
                                        type="hidden" 
                                        value={searchParams.get('key')}
                                        {...register('key')} 
                                    />

                                    <div className="mb-3">
                                        <label htmlFor="password1" className="form-label">Password</label>
                                            <input 
                                                type="password" 
                                                className={
                                                    cn({'form-control': true, 'is-invalid': errors.password1})
                                                } 
                                                {...register('password1', { 
                                                            required: true,
                                                            minLength: {
                                                                value: 8,
                                                                message: "min length is 12"
                                                            }
                                                        }
                                                    )}
                                            />
                                            {errors.password1 && <div className="invalid-feedback">{errors.password1.message}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password2" className="form-label">Confirm Password</label>
                                            <input 
                                                type="password" 
                                                className={
                                                    cn({'form-control': true, 'is-invalid': errors.password2})
                                                } 
                                                {...register('password2', { 
                                                            required: true,
                                                            validate: value => {
                                                                return value === watch('password1') || 'The passwords do not match'
                                                            }
                                                        }
                                                    )}
                                            />
                                            {errors.password2 && <div className="invalid-feedback">{errors.password2.message}</div>}
                                    </div>
                                   
                                    <div className="text-end">
										<a className="btn btn-link" href="/">Cancel</a>
										<button type="submit" className="btn btn-primary">Reset Password</button>
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

export default Reset;