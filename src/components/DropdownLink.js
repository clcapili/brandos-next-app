import React, { useEffect, useRef } from 'react';
import cn from "classnames";
import { Dropdown } from 'bootstrap'

const DropdownLink = ({
    id,
    children,
    className,
    ...props
  }) => {
    const ddRef = useRef()  

    let classNames = cn([
        className,
    ]);

    useEffect(() => {
        new Dropdown(ddRef.current, {})
    })
    
    return (
        <a className={classNames} data-bs-toggle="dropdown" ref={ddRef} aria-expanded="false">
            {children}
        </a>
    )
}

export default DropdownLink;