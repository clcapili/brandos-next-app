import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import SectionData from '../../../data/SectionData';
import ThemeData from '../../../data/ThemeData';
import MenuData from '../../../data/MenuData';
import { ReactSortable } from "react-sortablejs";
import { PageHeader, Loader, PathInput } from '../../../components';

const formOptions = {
    title: {
        required: "Please enter in a valid Menu Title",
        maxLength: { value: 255, message: "Menu Title should be less than 255 characters" }
    },
    url: {
        required: "Please enter in a valid URL",
        maxLength: { value: 255, message: "URL should be less than 255 characters" }
    }
};

const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "shared",
    handle: ".drag-handle"
};


function Sections() {
    const [account] = useOutletContext();
    const { data: sections, loading, error } = SectionData.useFind(account.id);
    const [sectionItems, setSectionItems] = useState();

    useEffect(() => {
        setSectionItems(sections ?? []);
    }, [sections]);
   
    return (
        <div className="main-content">
            <div className="container">
                <PageHeader 
                    title="Sections">
                </PageHeader>

                {loading && <Loader></Loader>}
                
                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                {sections &&
                    <div className="row">
                        <div className="col-lg-4">
                            <AddSectionItem account={account} sectionItems={sectionItems} setSectionItems={setSectionItems}></AddSectionItem>
                        </div>
                        <div className="col-lg-8">
                            <SectionForm account={account} sectionItems={sectionItems} setSectionItems={setSectionItems}></SectionForm>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

function SectionForm({account, sectionItems, setSectionItems}) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const onSubmit = (data, event) => {
        data.data = sectionItems;

        SectionData.update(account.id, data)
            .then(() => {
                navigate(`/${account.id}/settings/sections`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    const onRemoveSectionItem = (id) => {
        const newSectionItems = [...sectionItems];
 
        deleteObjectById(newSectionItems, id);
 
        setSectionItems(newSectionItems);
    };
 
    const deleteObjectById = (list, id) => {
        for (let i = 0; i < list.length; i++) {
            const obj = list[i];
            if (obj.id === id) {
                // If the object is found, remove it from the array
                list.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}  className="needs-validation">
              
            <div className="card mb-3">
                <div className="card-body">
                    <div className="mb-3">
                        
                        <div className="sortable-list-group">
                            <div className="list-group">
                                <div className="list-group-row list-group-header">
                                    <div className="col-control"></div>
                                    <div className="col-title">Title</div>
                                    <div className="col-3">Menu</div>
                                    <div className="col-3">Permissions</div>
                                    <div className="col-action"></div>
                                </div>
                            </div>

                            <ReactSortable tag="ul" className="list-group" list={sectionItems} setList={setSectionItems} {...sortableOptions}>
                                {sectionItems.map((sectionItem, sectionItemIndex) => (
                                    <SectionItem
                                        key={sectionItem.id}
                                        sectionItem={sectionItem}
                                        sectionItemIndex={[sectionItemIndex]}
                                        setSectionItems={setSectionItems}
                                        removeItem={onRemoveSectionItem}
                                    />
                                ))}
                            </ReactSortable>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end">
                <button type="submit" className="btn btn-primary">UPDATE</button>
            </div>
        </form>        
    )
}

function SectionItem({ sectionItem, removeItem }) {
    if (!sectionItem) return null;
    
    return (
        <li className="list-group-item" data-id={sectionItem.id}>
            <div className="list-group-row">
                <div className="col-control">
                    <i className="glyph glyph-move drag-handle"></i>
                </div>
                <div className="col-title">
                    <div className="thumbnail" dangerouslySetInnerHTML={{__html: sectionItem.icon}}></div>
                    <div>
                        <div className="title">{sectionItem.title}</div>
                        <div className="subtitle">{sectionItem.url ?? '&nbsp;'}</div>
                    </div>
                </div>
                <div className="col-3">
                    {sectionItem.menu && <span className="pe-4">{sectionItem.menu}</span>}
                </div>
                <div className="col-3">
                    {sectionItem.permissions ? <span className="pe-4">Check</span> : <span className="pe-4">Don't Check</span>}
                </div>
                <div className="col-action">
                    <i className="glyph glyph-close" onClick={() => removeItem(sectionItem.id)}></i>
                </div>
            </div>
        </li>
    );
}

function AddSectionItem({account, sectionItems, setSectionItems}) {

    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
    const { data: options, error, loading } = ThemeData.useOptions(account.id, account.themeId);
  
    // menus
    const { data: menus } = MenuData.useFindAll(account.id);

    const onSubmit = (data, event) => {
        setSectionItems([
            ...sectionItems,
            { id: Math.floor(Math.random() * 1000000), title: data.title, url: data.url, icon: data.icon, menu: data.menu, permissions: data.permissions }
        ])
        
        reset();
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit, onError)}  className="needs-validation">
                    <div className="mb-2">
                        <label htmlFor="title" className="form-label">Add Section Item</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Title"
                            className={
                                cn({ 'form-control': true, 'is-invalid': errors.title })
                            }
                            {...register('title', formOptions.title)}
                        />
                        
                        <ErrorMessage
                            errors={errors}
                            name="title"
                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                        />
                    </div>

                    <div className="mb-2">
                        <PathInput 
                            placeholder="URL"
                            control={control} 
                            name="url"
                            rules={{ required: false }} 
                        />

                        <div className={cn({"is-invalid": errors.url})}></div>
                        <ErrorMessage
                            errors={errors}
                            name="url"
                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                        />
                    </div>

                    <div className="mb-2">
                        <select
                            id="icon"
                            className={
                                cn({ 'form-select': true, 'is-invalid': errors.icon })
                            }
                            {...register('icon')}
                        >
                            <option value="">Select Icon</option>
                            {options && options.icons.map((icon, index) => <option key={index} value={icon.icon}>{icon.label}</option>)}
                        </select>

                        <ErrorMessage
                            errors={errors}
                            name="icon"
                            render={({ message }) => <div className="invalid-feedback">{message}</div>}
                        />
                    </div>

                    <div className="mb-2">
                        <select
                            id="menu"
                            className="form-select"
                            {...register('menu')}
                        >
                            <option value="">No Menu</option>
                            {menus && menus.map((menu, index) => <option key={index} value={menu.name}>{menu.name}</option>)}
                        </select>
                    </div>

                    <div className="mb-2">
                        <div className="form-check form-check-inline">
                            <input 
                                type="checkbox"
                                id="permissions"
                                className="form-check-input"
                                {...register('permissions', formOptions.permissions)}
                            />
                            <label htmlFor="permissions" className="form-check-label">Check Permissions</label>
                        </div>
                    </div>

                    <div className="text-end">
                        <button type="submit" className="btn btn-primary">ADD</button>
                    </div>
                </form>
            </div>   
        </div>
    )
}


export default Sections;