import config from 'config';
import React from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import { PageHeader, Loader, PathInput } from '../../../components';
import GeneralData from '../../../data/GeneralData';

const formOptions = {
    name: {
        required: "Please enter in a valid site name",
        maxLength: { value: 255, message: "Site name should be less than 255 characters" }
    },
    favicon: {
        validate: {
            maxSize: files => {
              if (!files[0]) return true; // return true if no files so that it skips validation
              
              return files[0]?.size < 100000 || 'Max 100kb';
            },
            acceptedFormats: files => {
                if (!files[0]) return true; 
                
                return ['image/jpeg', 'image/png', 'image/x-icon', 'image/svg+xml'].includes(files[0]?.type) || 'Only PNG, JPEG, ICO, SVG images';
            }
        },
        accept: 'image/jpeg, image/png, image/x-icon, image/svg+xml'
    },
    logo: {
        validate: {
            maxSize: files => {
              if (!files[0]) return true; // return true if no files so that it skips validation
              
              return files[0]?.size < 250000 || 'Max 250kb';
            },
            acceptedFormats: files => {
                if (!files[0]) return true; 
                
                return ['image/jpeg', 'image/png', 'image/svg+xml'].includes(files[0]?.type) || 'Only PNG, JPEG, SVG images';
            }
        },
        accept: 'image/jpeg, image/png, image/svg+xml'
    }
};

function Update() {
    const [account] = useOutletContext();
    const { data: general, loading, error } = GeneralData.useFind(account.id);

    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const onSubmit = (data, event) => {
        GeneralData.update(account.id, data)
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
                <PageHeader title="General"></PageHeader>
                
                {loading && <Loader></Loader>}
                
                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                {general &&
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit, onError)}  className="needs-validation">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Site Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                defaultValue={ general.name }
                                                className={
                                                    cn({ 'form-control': true, 'is-invalid': errors.name })
                                                }
                                                {...register('name', formOptions.name)}
                                            />
                                        
                                            <ErrorMessage
                                                errors={errors}
                                                name="name"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>
                                            

                                        <div className="mb-3">
                                            <label htmlFor="defaultPage" className="form-label">Default Page</label>
                                            <PathInput 
                                                control={control} 
                                                name="defaultPage"
                                                defaultValue={general.defaultPage || ''}
                                                rules={{ required: false }} 
                                            />

                                            <div className={cn({"is-invalid": errors.defaultPage})}></div>
                                            <ErrorMessage
                                                errors={errors}
                                                name="defaultPage"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="patternFolder" className="form-label">Patterns Folder</label>
                                            <PathInput 
                                                control={control} 
                                                name="patternFolder"
                                                defaultValue={general.patternFolder || ''}
                                                rules={{ required: false }} 
                                            />

                                            <div className={cn({"is-invalid": errors.patternFolder})}></div>
                                            <ErrorMessage
                                                errors={errors}
                                                name="patternFolder"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="favicon" className="form-label">Favicon (100kb max)</label>
                                                   
                                            <div className="row">
                                                <div className="col-2 align-self-center text-center">
                                                    {general.favicon ? 
                                                        <img className="img-fluid" src={`${config.storageDomain}${general.favicon}`} />
                                                        :
                                                        <p className="small text-secondary">No File</p>
                                                    }
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <input
                                                            className={
                                                                cn({ 'form-control': true, 'is-invalid': errors.favicon })
                                                            }
                                                            type="file"
                                                            id="favicon"
                                                            accept={formOptions.favicon.accept}
                                                            {...register('favicon', formOptions.favicon)}
                                                        />
                                            
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="favicon"
                                                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="logo" className="form-label">Logo (250kb max)</label>
                                                   
                                            <div className="row">
                                                <div className="col-2 align-self-center text-center">
                                                    {general.logo ? 
                                                        <img className="img-fluid" src={`${config.storageDomain}${general.logo}`} />
                                                        :
                                                        <p className="small text-secondary">No File</p>
                                                    }
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <input
                                                            className={
                                                                cn({ 'form-control': true, 'is-invalid': errors.logo })
                                                            }
                                                            type="file"
                                                            id="logo"
                                                            accept={formOptions.logo.accept}
                                                            {...register('logo', formOptions.logo)}
                                                        />
                                            
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="logo"
                                                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                                        />
                                                    </div>
                                                </div>
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
                }
            </div>
        </div>
    )
}



export default Update;