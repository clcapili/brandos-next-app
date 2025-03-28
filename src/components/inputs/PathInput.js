import React, { useState, useEffect } from 'react';
import { useController } from "react-hook-form";
import cn from 'classnames';
import ContentBrowser from './ContentBrowser';

function PathInput({value: defaultValue, placeholder, ...props}) {
    const { field, fieldState } = useController(props, );
    const [browserOpen, setBrowserOpen] = useState(false);
    const [guid, setGuid] = useState(defaultValue || '');

    useEffect(() => {
        setGuid(field.value || defaultValue || '');
    }, [field.value, defaultValue]);
      

    const onOpen = () => {
        setBrowserOpen(true);
    }

    const onSelect = (content) => {
        setGuid(content.guid);
        setBrowserOpen(false);
        field.onChange(content.guid);
    }

    const onClose = () => {
        setBrowserOpen(false);
    }

    return (
        <>
            <div className="input-group">
                <input 
                    {...field}
                    value={guid}
                    type="text"
                    placeholder={placeholder}
                    className={
                        cn({ 'form-control': true, 'is-invalid': fieldState.invalid })
                    }
                />
                <button className="btn btn-secondary" type="button" data-action="select" onClick={() => onOpen()}>
                    <i className="glyph glyph-new-folder"></i>
                </button>
            </div>
            {browserOpen && <ContentBrowser onClose={onClose} onSelect={onSelect}></ContentBrowser>}
        </>
    )
}

export default PathInput;