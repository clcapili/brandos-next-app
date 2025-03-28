import React, { useState, useEffect } from 'react';
import { useController } from "react-hook-form";
import cn from 'classnames';

function TagInput({value: defaultValue, ...props}) {
    const { field, fieldState } = useController(props);
    const [tags, setTags] = useState(defaultValue || []);

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let input = event.target;
    
            let allTags = [...tags];
            allTags.push(input.value.trim());
            setTags(allTags);
    
            input.value = '';
    
            field.onChange(allTags);
        }
    }
    
    const onRemove = (index) => {
        let updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);

        field.onChange(updatedTags);
    }

    return (
        <>
            <input 
                type="text"
                className='form-control'
                onKeyDown={(event) => onKeyDown(event)}
            />
            
            <div className="mb-2">
                <small>Press <strong>Enter</strong> after each tag</small>
            </div>

            <ul className="tags list-unstyled list-group list-group-horizontal">
                {tags.map((tag, index) =>
                    <li key={index}>
                        <span className="badge rounded-pill text-bg-secondary me-1 mb-1">{tag} <i className="glyph glyph-close" onClick={() => onRemove(index)}></i></span>
                    </li>
                )}
            </ul>
        </>
    )
}

export default TagInput;