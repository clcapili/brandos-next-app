import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { useDropzone } from 'react-dropzone'
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import { ContentData, ThemeData } from '../../data';
import { CONTENT_SCHEMA } from "./constants";

const formOptions = {
    name: {
        required: "Please enter in a valid name",
        maxLength: { value: 255, message: "Name should be less than 255 characters" }
    }
};

function Create() {
    const [account] = useOutletContext();
    
    const { schema, parentId = 0 } = useParams();

   
    return (
        <div className="main-content cms-page">

            <div className="container">
                
                <div className="page-header condensed">
                    <div className="row">
                        <div className="col-9">
                            <h1>Create {CONTENT_SCHEMA[schema]}</h1>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        
                        <div className="card">
                            <div className="card-body">
                                {schema == 'page' && <CreatePageForm account={account} parentId={parentId}></CreatePageForm>}
                                {schema == 'folder' && <CreateFolderForm account={account} parentId={parentId}></CreateFolderForm>}
                                {schema == 'file' && <CreateFileForm account={account} parentId={parentId}></CreateFileForm>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

function CreatePageForm({account, parentId}) {
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const navigate = useNavigate();

    const [template, setTemplate] = useState([]);

    const { data: theme, error, loading } = ThemeData.useFind(account.id, account.themeId);

    const onSubmit = (data, event) => {
        data.parentId = parentId;
        data.schema = 'page';

        data.data = {
            body: template
        };

        ContentData.create(account.id, data)
            .then((response) => {
                navigate(`/${account.id}/content/${response.id}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}  className="needs-validation">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    className={
                        cn({ 'form-control': true, 'is-invalid': errors.name })
                    }
                    name="name"
                    {...register('name', formOptions.name)}
                />

                <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => <div className="invalid-feedback">{message}</div>}
                />
            </div>

            <div>
                {theme && <Templates path={theme.config.editor.options} setTemplate={setTemplate} />}
            </div>


            <div className="">
                <button type="submit" className="btn btn-primary">SAVE</button>
            </div>
        </form>
    );
}


function Templates({path, setTemplate}) {
    const [options, setOptions] = useState();


    useEffect(() => {
        fetch(path, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            }
        )
        .then(response => response.json())
        .then(data => setOptions(data));
    }, [])

    const selectTemplate = (name) => {
        const found = options.templates.find(template => template.name == name);

        setTemplate(found.body);
    }

    return options ? 
        <div className="template-list">
            <div className="row">
                {options.templates.map(template => 
                    <div className="col-md-3">
                        <div className="form-group text-center">
                            <label>
                                <input type="radio" name="template" value={template.name} onClick={() => selectTemplate(template.name)} />
                                <img src={template.thumbnail} className="img-fluid" />
                            </label>
                            <div className="text-center">{template.label}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        : 
        <></>
}

function CreateFolderForm({account, parentId}) {
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data, event) => {
        data.parentId = parentId;
        data.schema = 'folder';
        data.autoPublish = true;

        ContentData.create(account.id, data)
            .then((response) => {
                navigate(`/${account.id}/content/${response.id}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}  className="needs-validation">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    className={
                        cn({ 'form-control': true, 'is-invalid': errors.name })
                    }
                    name="name"
                    {...register('name', formOptions.name)}
                />
                
                <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => <div className="invalid-feedback">{message}</div>}
                />
            </div>

            <div className="">
                <button type="submit" className="btn btn-primary">SAVE</button>
            </div>
        </form>
    );
}

function CreateFileForm({account, parentId}) {
    const navigate = useNavigate();

    const onDrop = useCallback(acceptedFiles => {
        
        for (let i = 0; i < acceptedFiles.length; i++) {
            let data = {};
            data.parentId = parentId;
            data.schema = 'file';
            data.name = acceptedFiles[i].name;
            data.upload = true;
            data.autoPublish = true;
    
            ContentData.create(account.id, data)
                .then((response) => {

                    if (response.uploadPath) {
                        let uploadData = {};
                        uploadData.id = response.id;
                        uploadData.type = response.type;
                        uploadData.file = acceptedFiles[i];
                        uploadData.path = response.uploadPath;

                        ContentData.upload(account.id, uploadData)
                            .then((result) => {
                                navigate(`/${account.id}/content/${response.id}`);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                            
                    }
                    
                })
                .catch((err) => {
                    console.log(err);
                })
                
        }

    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps({className: 'p-3 d-flex align-items-center justify-content-center', style: {height: '10em'}})} >
          <input {...getInputProps()}></input>
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
            
        </div>
    );
}

export default Create;