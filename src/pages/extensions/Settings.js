import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext, useParams, NavLink, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import ExtensionData from '../../data/ExtensionData';
import { PageHeader, Loader } from '../../components';

function Settings() {
    const [account] = useOutletContext();
    const { id, pageIndex } = useParams();

    const { data: extension, loading, error } = ExtensionData.useFind(account.id, id);
    const page = extension ? extension.admin.pages[pageIndex ?? 0] : null;

    return (
        <div className="main-content">
            <div className="container">

                {loading && <Loader></Loader>}
                
                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                {extension && page &&
                    <>
                        <PageHeader title={extension.name + " Settings"}></PageHeader>

                        <div className="row">
                            {extension.admin.pages.length > 1 &&
                                <div className="col-md-3">
                                    <ul>
                                        {extension.admin.pages.map((page, index) =>
                                            <li key={index}><NavLink to={`/${account.id}/extensions/settings/${id}/${index}`}>{page.label}</NavLink></li>
                                        )}
                                    </ul>
                                </div>
                            }

                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-body">
                                        <Form account={account} page={page} extension={extension} />
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

function Form({account, page, extension}) {
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ shouldUnregister: true });
    
    const onSubmit = (data, event) => {
        
        console.log(data);

        ExtensionData.update(account.id, extension.id, page.name, data)
            .then(() => {
                navigate({ pathname: `/${account.id}/extensions` });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    return (
        <form key={page.name} onSubmit={handleSubmit(onSubmit, onError)}  className="needs-validation">
            {page.fields.map((field, index) =>
                <div key={index} className="mb-3">

                    <label htmlFor={field.name} className="form-label">{field.label}</label>
                    <input
                        type="text"
                        id={field.name}
                        defaultValue={ extension.data[field.name] ?? ''}
                        className={
                            cn({ 'form-control': true, 'is-invalid': errors[field.name] })
                        }
                        {...register(field.name, field.options)}
                    />
                
                    <ErrorMessage
                        errors={errors}
                        name={field.name}
                        render={({ message }) => <div className="invalid-feedback">{message}</div>}
                    />
                </div>
            )}

            <div className="">
                <button type="submit" className="btn btn-primary">SAVE</button>
            </div>
        </form>
    )
}

export default Settings;