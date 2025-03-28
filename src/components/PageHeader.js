import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PageHeader({ title, thumbnail, breadcrumb, link, dropdown, ...props }) {
    const [isLeftNav, setLeftNav] = useState(false);
   
    useEffect(() => {
        document.body.classList.toggle('navigation-open', isLeftNav);
    });

    const handleLeftNavToggle = () => {
        setLeftNav(!isLeftNav);
    };

    return (
        <div className="page-header">
            {breadcrumb && 
                <div className="breadcrumbs">
                    <Link className="link-arrow-back" to={breadcrumb.href}>{breadcrumb.text}</Link>
                </div>
            }
            <div className="row">
                {thumbnail && 
                    <div className="col-2">
                        <img src={thumbnail} className="img-fluid" />
                    </div>
                }
                
                <div className="col">
                    <a className="navigation-toggle" onClick={() => handleLeftNavToggle()}><i className="glyph-menu"></i></a>
                    <h1>{title}</h1>

                    {props.children}
                </div>
                
                <div className="col text-end">
                    {link && (
                        <Link className={link.classes} to={link.href}>{link.text}</Link> 
                    )}
                    {dropdown && <Dropdown dropdown={dropdown}></Dropdown>}
                </div>
                
            </div>
        </div>
    );

}

function Dropdown({dropdown}) {
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {dropdown.name ? dropdown.name : 'Options'}
            </button>

            <ul className="dropdown-menu">
                {dropdown.links.map((link, index) =>
                    <li key={index}><NavLink className="dropdown-item" to={link.href}>{link.text}</NavLink></li>
                )}
            </ul>
        </div>
    );
}

export default PageHeader;
