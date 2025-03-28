import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { RegisterData } from '../../data';
import cn from "classnames";
import AuthService from '../../services/AuthService';
import { getProfilePhoto } from '../../helpers';

function Register() {
    const { plan } = useParams();
    const [showLogin, setShowLogin] = useState(false);

    const authUser = AuthService.authUser;

    let form = <></>
    if (authUser) {
        // account
        form = <AccountRegister plan={plan} authUser={authUser} /> 
    } else if (showLogin) {
        // login
        form = <LoginForm setShowLogin={setShowLogin} />
    } else {
        // user
        form =  <UserRegister setShowLogin={setShowLogin} />
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {form}
                </div>
            </div>
        </div> 
    )
}


function UserRegister({setShowLogin}) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, event) => {

        RegisterData.register(data)
            .then((payload) => {
                AuthService.update(payload);
               
            })
            .catch((err) => {
                if (err == 'You already have an account') {
                    setShowLogin(true)
                }
            })

    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    return (
        <div className="register-page">
            <h3 className="text-center">Register</h3>
            <div className="card bg-light mb-3">
                <div className="card-body" >
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="needs-validation">
                        
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input 
                                    id="firstName"
                                    type="text"
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
                                    id="lastName"
                                    type="text"
                                    className={
                                        cn({'form-control': true, 'is-invalid': errors.lastName})
                                    } 
                                    {...register('lastName', { required: true })}
                                />
                            {errors.lastName?.type === 'required' && <div className="invalid-feedback">Please enter in a valid name</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                id="email"
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

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password" 
                                type="password" 
                                className={
                                    cn({'form-control': true, 'is-invalid': errors.password})
                                } 
                                {...register('password', { required: true })}
                            />
                            {errors.password?.type === 'required' && <div className="invalid-feedback">Please enter a password</div>}
                        </div>
                        
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Next</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

function AccountRegister({plan, authUser}) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [accountId, setAccountId] = useState(null);

    const onSubmit = (data, event) => {

        RegisterData.registerAccount(data)
            .then((payload) => {
                authUser.accounts.push(payload.id);
                AuthService.update(authUser);

                setAccountId(payload.id);
            })
            .catch((err) => {
                
            })
    }

    useEffect(() => {
        if (accountId) {
            navigate('/'+accountId);
        }
    }, [accountId])

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    return (
        <div className="register-page">
            <h3 className="text-center">Register</h3>

            <div className="card bg-light mb-3">
                <div className="card-body">
                    
                    <div className="row g-2">
                        <div className="col-2">
                            <img src={getProfilePhoto(authUser)} className="img-fluid rounded" alt="" />
                        </div>
                        <div className="col">
                            <h5 className="card-title mb-0">{authUser.name}</h5>
                            <p className="card-text mb-0"><small className="text-body-secondary"> {authUser.email}</small></p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="card bg-light mb-3">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="needs-validation">
                        
                        <div className="mb-3">
                            <label htmlFor="company" className="form-label">Company/Organization</label>
                            <input 
                                    type="text" 
                                    id="company"
                                    className={
                                        cn({'form-control': true, 'is-invalid': errors.company})
                                    } 
                                    {...register('company', { required: true })}
                                />
                            {errors.company?.type === 'required' && <div className="invalid-feedback">Please enter in a valid company or organization name</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="promo" className="form-label">Promo</label>
                            <input 
                                type="text" 
                                className="form-control"
                                {...register('promo')}
                            />
                        </div>
                        
                        <input type="hidden" value={plan} {...register('plan', { required: true })}></input>
                        
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" disabled={accountId}>Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>    
    )
}

function LoginForm({setShowLogin}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data, event) => {
        AuthService.login(data.email, data.password)
            .then(user => {  
                
                setShowLogin(false);
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    return (
        <div className="register-page">
                            
            <div className="alert alert-primary" role="alert">
                <h2 className="text-center">Hold on! It looks like you already use BrandOS</h2>
                <p className="text-center">Start a brand new account with the email and password you already have to manage all of your accounts with one username.</p>
            </div>
            
            <div className="card bg-light mb-3">
                <div className="card-body" >
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
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className={
                                        cn({'form-control': true, 'is-invalid': errors.password})
                                    } 
                                    {...register('password', { 
                                                required: true,
                                                minLength: {
                                                    value: 8,
                                                    message: "min length is 12"
                                                }
                                            }
                                        )}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register;