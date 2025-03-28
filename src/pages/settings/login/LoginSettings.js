import config from 'config';
import React from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import { PageHeader, Loader } from '../../../components';
import GeneralData from '../../../data/GeneralData';

const formOptions = {
    image: {
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

function LoginSettings() {
    const [account] = useOutletContext();
    const { data: settings, loading, error } = GeneralData.useFindLoginSettings(account.id);
    const { register, handleSubmit, formState: { errors }, control } = useForm({defaultValues: settings });

    const onSubmit = (data, event) => {
        GeneralData.updateLoginSettings(account.id, data)
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
                <PageHeader title="Login Settings"></PageHeader>
                
                {loading && <Loader></Loader>}
                
                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                {settings &&
                    <div className="card mb-3">
                        <div className="card-body">

                                    <form onSubmit={handleSubmit(onSubmit, onError)}  className="needs-validation">
                                        <div className="mb-3">
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="disableForm"
                                                    defaultValue={settings.disableForm}
                                                    {...register('disableForm')}
                                                />
                                                <label className="form-check-label" htmlFor="disableForm">Disable email/password form</label>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <label htmlFor="color" className="form-label">Color</label>
                                            <input
                                                type="color"
                                                id="color"
                                                defaultValue={ settings.color }
                                                className={
                                                    cn({ 'form-control': true, 'is-invalid': errors.color })
                                                }
                                                {...register('color')}
                                            />
                                        
                                            <ErrorMessage
                                                errors={errors}
                                                name="color"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="size" className="form-label">Size</label>
                                            <select
                                                id="size"
                                                className={
                                                    cn({ 'form-select': true, 'is-invalid': errors.size })
                                                }
                                                {...register('size')}
                                            >
                                                <option value="contain">Contain</option>
                                                <option value="cover">Cover</option>
                                            </select>
                                        
                                            <ErrorMessage
                                                errors={errors}
                                                name="size"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="position" className="form-label">Position</label>
                                            <input
                                                type="text"
                                                id="position"
                                                defaultValue={ settings.position }
                                                className={
                                                    cn({ 'form-control': true, 'is-invalid': errors.position })
                                                }
                                                {...register('position')}
                                            />
                                        
                                            <ErrorMessage
                                                errors={errors}
                                                name="position"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="repeat" className="form-label">Repeat</label>
                                            <select
                                                id="repeat"
                                                className={
                                                    cn({ 'form-select': true, 'is-invalid': errors.repeat })
                                                }
                                                {...register('repeat')}
                                            >
                                                <option value="no-repeat">No Repeat</option>
                                                <option value="repeat">Repeat</option>
                                                <option value="repeat-x">Repeat x</option>
                                                <option value="repeat-y">Repeat y</option>
                                            </select>

                                            <ErrorMessage
                                                errors={errors}
                                                name="repeat"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label">Image (500kb max)</label>
                                                   
                                            <div className="row">
                                                <div className="col-2 align-self-center text-center">
                                                    {settings.image ? 
                                                        <img className="img-fluid" src={`${config.storageDomain}${settings.image}`} />
                                                        :
                                                        <p className="small text-secondary">No File</p>
                                                    }
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <input
                                                            className={
                                                                cn({ 'form-control': true, 'is-invalid': errors.image })
                                                            }
                                                            type="file"
                                                            id="image"
                                                            accept={formOptions.image.accept}
                                                            {...register('image', formOptions.image)}
                                                        />
                                            
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="image"
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
                }
            </div>
        </div>
    )
}

export default LoginSettings;