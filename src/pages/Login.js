import config from 'config';
import React, { useState, useEffect } from 'react';
import { AccountData } from '../data';
import AuthService from '../services/AuthService';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link, useSearchParams } from "react-router-dom";
import cn from "classnames";

function Login() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const serverName = searchParams.get('serverName') ?? '';
    const path = getPath(searchParams.get('path'), location);

    const { data: settings, loading, error } = AccountData.useFindLoginSettings(serverName);

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    return settings !== undefined && 
            <div className="login-page" style={styles(settings)} >

                <div className="login-page-dialog">   
                    
                    <div className="card mb-3">
                        <div className="card-body" >
                                
                            <div className="company-logo">
                                {settings && settings.logo ? <img src={`${config.storageDomain}${settings.logo}`} /> :  <img src="/img/brand.png" />}
                            </div>
                            
                            <h4 className="text-center mb-3">Log in to continue</h4>
                            {settings ? 
                                <>
                                    {showForm || settings.options.length == 0 ? 
                                        <Form serverName={serverName} path={path} toggleForm={toggleForm} options={settings.options}></Form> :
                                        <LoginOptions toggleForm={toggleForm} options={settings.options}></LoginOptions>
                                    }
                                </>
                                :
                                <Form serverName={serverName} path={path} options={[]}></Form>
                            }
                            
                             
                        </div>
                    </div>
                    
                </div>              
            </div>
     ;
}


function styles(settings) {
    if (!settings) return {};

    return {
        backgroundColor: settings.color ?? '',
        backgroundImage: settings.image ? `url(${config.storageDomain}${settings.image})` : '',
        backgroundRepeat: settings.repeat ?? '',
        backgroundPosition: settings.position ?? '',
        backgroundSize: settings.size ?? ''
    }
}

function LoginOptions({toggleForm, options}) {
    return (
        <div className="login-options">
            {options.map((option, index) =>
                <div key={index} className="mb-3 d-grid gap-2">
                    <a className="btn btn-outline-dark" href={option.url}>{option.label}</a>
                </div>
            )}
            <div className="mb-3 d-grid gap-2">
                <a className="btn btn-outline-dark" onClick={toggleForm}>Email/Password</a>
            </div>
        </div>
    )
}

function Form({serverName, path, toggleForm, options}) {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, event) => {
        AuthService.login(data.email, data.password, serverName, path)
            .then(user => {  
                
                // change to redirect to path from response
                if (serverName == '') {
                    setRedirect(user.redirect);
                } else {
                    window.location.href = user.redirect;
                }

            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    useEffect(() => {
        if (redirect) {
            navigate({ pathname: redirect });
        }
    }, [redirect]);

    return (
        <div className="login-form">
                           
            <form onSubmit={handleSubmit(onSubmit, onError)} className="needs-validation">
                
                <div className="mb-3">
                    <input 
                        type="text" 
                        placeholder="Email"
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
                    <input 
                        type="password" 
                        placeholder="Password"
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
                <div className="mb-2 d-grid gap-2">
                    <button type="submit" className="btn btn-dark">Login</button>
                </div>
                <div className="text-end">
                    <Link to="/password/forgot">Forgot Password?</Link>
                </div>
                {options.length > 1 &&
                    <div className="text-end">
                        <a onClick={toggleForm} href="#">Other Sign-in Options</a>
                    </div>
                }
            </form>
        </div>
                   
    );
}

function getPath(path, location) {
    if (path) {
        return path;
    } else if (location.state) {
        return location.state.from.pathname;
    } else {
        return '/';
    }
}

export default Login;