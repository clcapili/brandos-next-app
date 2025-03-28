import React from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import DomainData from '../../../data/DomainData';
import { PageHeader } from '../../../components';

const formOptions = {
    domain: {
        required: "Please enter in a valid domain",
        maxLength: { value: 255, message: "Domain should be less than 255 characters" }
    }
};

function Create() {
    const [account] = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }  } = useForm();

    const onDomainSubmit = (data, event) => {
        DomainData.create(account.id, data)
            .then((response) => {
                navigate(`/${account.id}/settings/domains`);
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
                <PageHeader title="Add Domain"></PageHeader>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onDomainSubmit, onError)}  className="needs-validation">
                                    <div className="mb-3">
                                        <label htmlFor="domain" className="form-label">Domain</label>
                                        <input
                                            type="text"
                                            id="domain"
                                            className={
                                                cn({ 'form-control': true, 'is-invalid': errors.domain })
                                            }
                                            {...register('domain', formOptions.domain)}
                                        />
                                        
                                        <ErrorMessage
                                            errors={errors}
                                            name="domain"
                                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                id="ssl"
                                                className="form-check-input"
                                                {...register('ssl', formOptions.ssl)}
                                            />
                                            <label htmlFor="ssl" className="form-check-label">SSL</label>
                                        </div>
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
    );
}

export default Create;