import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import { ContentData } from '../../data';
import { PageHeader, Loader } from '../../components';
import TagInput from '../../components/inputs/TagInput';

const formOptions = {
    name: {
        required: "Please enter in a valid content name",
        maxLength: { value: 255, message: "Content Name should be less than 255 characters" }
    },
    urlName: {
        required: "Please enter in a valid URL slug",
        maxLength: { value: 128, message: "URL slug should be less than 128 characters" }
    },
    thumbnail: {
        required: false
    },
    excerpt: {
        required: false
    }
};

function Update() {
    const [account] = useOutletContext();
    const { id } = useParams();
    const { data: content, setData: setContent, loading, error } = ContentData.useFind(account.id, id);
    const [ removeThumbnail, setRemoveThumbnail ] = useState(false);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const onContentSubmit = (data, event) => {
        if (data.thumbnail && data.thumbnail.length > 0) {
            data.upload = true;
        }

        data.removeThumbnail = removeThumbnail;

        ContentData.update(account.id, data)
            .then((response) => {
                if (response.uploadPath) {
                    let uploadData = {};
                    uploadData.id = response.id;
                    uploadData.type = response.type;
                    uploadData.file = data.thumbnail[0];
                    uploadData.path = response.uploadPath;
                   
                    
                    ContentData.upload(account.id, uploadData)
                        .then((result) => {
                            navigate(`/${account.id}/content/${response.id}`);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                } else {
                    navigate(`/${account.id}/content/${response.id}`);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }
   
    const getUrlSlug = (url) => {
        let parts = url.split('/');
        return parts.pop() || parts.pop();  // handle potential trailing slash
    }

    const [urlPreview, setUrlPreview] = useState('');

    useEffect(() => {
        setUrlPreview(content?.working.slug);
    }, [content]);

    const onUrlChange = (e) => {
        const newUrl = e.target.value;
        setUrlPreview(newUrl);
    };

    const getParentUrl = (guid) => {
        guid = guid.replace(/\/$/, '');
        const currentUrl = guid.split('/');
        currentUrl.pop();
        const parentUrl = currentUrl.join('/');

        return parentUrl;
    }

    const onRemoveThumbnail = () => {
        let item = {...content}
        item.working.thumbnail = null;

        setContent(item)
        setRemoveThumbnail(true)
    }

    return (
        <div className="main-content">
            <div className="container">
                <PageHeader title="Update Content"></PageHeader>
                
                {loading && <Loader></Loader>}
                
                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                {content &&
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onContentSubmit, onError)}  className="needs-validation">
                                        <input
                                            type="hidden"
                                            defaultValue={ content.id }
                                            {...register('id')}
                                        />

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                defaultValue={ content.working.name }
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
                                            <label htmlFor="urlName" className="form-label">URL</label>
                                            <input
                                                type="text"
                                                id="urlName"
                                                defaultValue={ content.working.slug }
                                                className={
                                                    cn({ 'form-control': true, 'is-invalid': errors.urlName })
                                                }
                                                {...register('urlName', {
                                                    ...formOptions.urlName,
                                                    onChange: (e) => { onUrlChange(e)},
                                                })}
                                            />
                                            
                                            <ErrorMessage
                                                errors={errors}
                                                name="urlName"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                            
                                            <small>{getParentUrl(content.guid)}/<strong id="cleanURL">{urlPreview}</strong>/</small>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="tags" className="form-label">Tags</label>
                                            <TagInput 
                                                control={control} 
                                                name="tags"
                                                value={content.working.tags || []}
                                                rules={{ required: false }} 
                                            />

                                            <div className={cn({"is-invalid": errors.tags})}></div>
                                            <ErrorMessage
                                                errors={errors}
                                                name="tags"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="excerpt" className="form-label">Excerpt</label>
                                            <textarea
                                                id="excerpt"
                                                rows="6"
                                                defaultValue={ content.working.excerpt }
                                                className={
                                                    cn({ 'form-control': true, 'is-invalid': errors.excerpt })
                                                }
                                                {...register('excerpt', formOptions.excerpt)}
                                            ></textarea>
                                            
                                            <ErrorMessage
                                                errors={errors}
                                                name="excerpt"
                                                render={({ message }) => <div className="invalid-feedback">{message}</div>}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                                            
                                            <div className="row">
                                                {content.working.thumbnail && !removeThumbnail &&
                                                    <div className="col-4">
                                                        <img className="img-fluid" src={`${content.working.thumbnail.path}`} />
                                                          
                                                        {content.working.thumbnail && (
                                                            <p className="text-center">
                                                                <button
                                                                    className="btn btn-sm btn-link"
                                                                    type="button"
                                                                    onClick={() => onRemoveThumbnail()}
                                                                >Remove Your Photo</button>
                                                            </p>
                                                        )}
                                                    </div>
                                                }
                                                <div className="col">
                                                    <input
                                                        className={
                                                            cn({ 'form-control': true, 'is-invalid': errors.thumbnail })
                                                        }
                                                        type="file"
                                                        id="thumbnail"
                                                        accept="image/png, image/jpeg"
                                                        {...register('thumbnail', formOptions.thumbnail)}
                                                    />
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    id="search"
                                                    className="form-check-input"
                                                    {...register('search', { value: content.search})}
                                                />
                                                <label htmlFor="search" className="form-check-label">Include in search</label>
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