import React from 'react';
import AuthService from '../../services/AuthService';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PasswordData } from '../../data';
import cn from "classnames";

function Forgot(props) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const authUser = AuthService.authUser;
    if (authUser) {
        navigate('/');
    }

    const onSubmit = (data, event) => {
        PasswordData.forgot(data)
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
        <div className="login-page">
            <div className="login-page-dialog">   
                <div className="card bg-light mb-3">
                    <div className="card-body">

                    <h4 className="text-center mb-3">Forgot Password</h4>

                        <form onSubmit={handleSubmit(onSubmit, onError)} className="needs-validation">
                            
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="text" 
                                    className={
                                        cn({'form-control': true, 'is-invalid': errors.email})
                                    } 
                                    {...register('email', { 
                                                required: true,
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: "Entered value does not match email format"
                                                }
                                            }
                                        )}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                            </div>
                        
                            <div className="text-end">
                                <a className="btn btn-link" href="/">Cancel</a>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgot;