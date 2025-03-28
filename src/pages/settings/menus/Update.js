import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import cn from 'classnames';
import MenuData from '../../../data/MenuData';
import { ReactSortable } from "react-sortablejs";
import { PageHeader, Loader, PathInput } from '../../../components';

const formOptions = {
    name: {
        required: "Please enter in a valid menu name",
        maxLength: { value: 255, message: "Menu Name should be less than 255 characters" }
    },
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


function Update() {
    const [account] = useOutletContext();
    const { id } = useParams();
    const { data: menu, loading, error } = MenuData.useFind(account.id, id);
    const [menuItems, setMenuItems] = useState();

    useEffect(() => {
        setMenuItems(menu ? menu.data : []);
    }, [menu]);
   
    return (
        <div className="main-content">
            <div className="container">
                <PageHeader 
                    title={ menu && `Menu: ${menu.name}` }>
                </PageHeader>

                {loading && <Loader></Loader>}
                
                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                {menu &&
                    <div className="row">
                        <div className="col-lg-4">
                            <AddMenuItem menuItems={menuItems} setMenuItems={setMenuItems}></AddMenuItem>
                        </div>
                        <div className="col-lg-8">
                            <MenuForm account={account} menu={menu} menuItems={menuItems} setMenuItems={setMenuItems}></MenuForm>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

function MenuForm({account, menu, menuItems, setMenuItems}) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const onSubmit = (data, event) => {
        data.data = menuItems;

        MenuData.update(account.id, data)
            .then(() => {
                navigate(`/${account.id}/settings/menus`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    const onRemoveMenuItem = (id) => {
        const newMenuItems = [...menuItems];
 
        deleteObjectById(newMenuItems, id);
 
        setMenuItems(newMenuItems);
    };
 
    const deleteObjectById = (list, id) => {
        for (let i = 0; i < list.length; i++) {
            const obj = list[i];
            if (obj.id === id) {
                // If the object is found, remove it from the array
                list.splice(i, 1);
                return true;
            } else if (obj.children && obj.children.length > 0) {
                // If the object has nested objects, recursively call this function on the nested array
                const deleted = deleteObjectById(obj.children, id);
                if (deleted) {
                    return true;
                }
            }
        }
        return false;
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}  className="needs-validation">
            <div className="card mb-3">
                <div className="card-body">
                    <input
                        type="hidden"
                        defaultValue={ menu.id }
                        {...register('id')}
                    />

                    <div className='mb-3'>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            defaultValue={ menu.name }
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

                        <div className="sortable-list-group">
                            <div className="list-group">
                                <div className="list-group-row list-group-header">
                                    <div className="col-control"></div>
                                    <div className="col-title">Title</div>
                                    <div className="col-3">Permissions</div>
                                    <div className="col-action"></div>
                                </div>
                            </div>

                            <ReactSortable tag="ul" className="list-group list-group-sortable" list={menuItems} setList={setMenuItems} {...sortableOptions}>
                                {menuItems.map((menuItem, menuItemIndex) => (
                                    <LinkItem
                                        key={menuItem.id}
                                        menuItem={menuItem}
                                        menuItemIndex={[menuItemIndex]}
                                        setMenuItems={setMenuItems}
                                        removeItem={onRemoveMenuItem}
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

function LinkItem({ menuItem, setMenuItems, menuItemIndex, removeItem }) {
    if (!menuItem) return null;
    
    return (
        <li className="list-group-item" data-id={menuItem.id}>
            <div className="list-group-row">
                <div className="col-control">
                    <i className="glyph glyph-move drag-handle"></i>
                </div>
                <div className="col-title">
                    <div>
                        <div className="title">{menuItem.title}</div>
                        <div className="subtitle">{menuItem.url ?? '&nbsp;'}</div>
                    </div>
                </div>

                <div className="col-3">
                    {menuItem.permissions ? <span className="pe-4">Check</span> : <span className="pe-4">Don't Check</span>}
                </div>
                <div className="col-action">
                    <i className="glyph glyph-close" onClick={() => removeItem(menuItem.id)}></i>
                </div>
            </div>
            
           
                <ReactSortable
                    tag="ul"
                    className="list-group"
                    key={menuItem.id}
                    list={menuItem.children}
                    setList={(currentList) => {
                        setMenuItems((sourceList) => {
                            const tempList = [...sourceList];
                            const _menuItemIndex = [...menuItemIndex];
                            const lastIndex = _menuItemIndex.pop();
                            const lastArr = _menuItemIndex.reduce(
                                (arr, i) => arr[i]["children"],
                                tempList
                            );
                            
                            lastArr[lastIndex]["children"] = currentList;
                            return tempList;
                        });
                    }}
                    {...sortableOptions}
                >
                    {menuItem.children && menuItem.children.map((childMenuItem, index) => {
                        return (
                            <LinkItem
                                key={childMenuItem.id}
                                menuItem={childMenuItem}
                                menuItemIndex={[...menuItemIndex, index]}
                                setMenuItems={setMenuItems}
                                removeItem={removeItem}
                            />
                        );
                    })}
                </ReactSortable>
           
        </li>
    );
}

function AddMenuItem({menuItems, setMenuItems}) {
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();

    const onSubmit = (data, event) => {
        setMenuItems([
            ...menuItems,
            { id: Math.floor(Math.random() * 1000000), title: data.title, url: data.url, permissions: data.permissions, children: [] }
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
                        <label htmlFor="title" className="form-label">Add Menu Item</label>
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

export default Update;