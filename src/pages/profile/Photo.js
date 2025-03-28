import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import AuthService from '../../services/AuthService';
import { ProfileData } from '../../data';
import { PageHeader } from '../../components';
import config from 'config';

const formOptions = {
    photo: {
        required: "Please choose file",
        validate: {
            lessThan4MB: files => files[0]?.size < 4_000_000 || 'Max 4MB',
            acceptedFormats: files =>
                ['image/jpeg', 'image/png'].includes(files[0]?.type)
                || 'Only PNG, JPEG images',
        }
    }
};

function Photo({...props}) {
    const authUser = AuthService.authUser;
    const [profile] = useOutletContext();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [photo, setPhoto] = useState();
    

    useEffect(() => {
        setPhoto(profile.photo);
    }, [profile]);
    
    const onPhotoSubmit = (data) => {
        ProfileData.updatePhoto(data)
            .then((response) => {
                setPhoto(response.photo);

                AuthService.authUser.photo = response.photo;
                AuthService.update(AuthService.authUser);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onPhotoRemove = (data) => {
        ProfileData.removePhoto(data)
            .then((response) => {
                setPhoto('');

                AuthService.authUser.photo = '';
                AuthService.update(AuthService.authUser);
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
                <div className="container-lg">
                    <PageHeader title="Photo"></PageHeader>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-body">

                                    <form onSubmit={handleSubmit(onPhotoSubmit, onError)} className="needs-validation">
                                        <div className="row">
                                            <div className="col-4">
                                                {photo ? 
                                                    <img className="img-fluid" src={`${config.storageDomain}${photo}`} />
                                                    :
                                                    <img className="img-fluid" src={`https://ui-avatars.com/api/?background=00B4ED&color=fff&name=${authUser.name}`} />
                                                }
                                                {photo && (
                                                    <p className="text-center">
                                                        <button
                                                            className="btn btn-sm btn-link"
                                                            onClick={onPhotoRemove}
                                                            type="button"
                                                        >Remove Your Photo</button>
                                                    </p>
                                                )}
                                            </div>
                                            <div className="col-8">
                                                <div className="mb-3">
                                                    <label htmlFor="photo" className="form-label">Select an image file (4MB max)</label>
                                                    <input
                                                        className={
                                                            cn({ 'form-control': true, 'is-invalid': errors.photo })
                                                        }
                                                        type="file"
                                                        id="photo"
                                                        accept="image/png, image/jpeg"
                                                        {...register('photo', formOptions.photo)}
                                                    />
                                        
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name="photo"
                                                        render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                                    />
                                                </div>
                                                <div className="">
                                                    <button type="submit" className="btn btn-primary">SAVE</button>
                                                </div>
                                            </div>
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

export default Photo;