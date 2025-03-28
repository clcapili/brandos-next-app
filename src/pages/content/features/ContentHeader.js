import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ContentData } from '../../../data';
import ContentMenu from './menus/ContentMenu';

function PageHeader({ account, content, clipboard, doAction, prefix, backLink }) {
    const [isLeftNav, setLeftNav] = useState(false);
   
    useEffect(() => {
        document.body.classList.toggle('navigation-open', isLeftNav);
    });

    const handleLeftNavToggle = () => {
        setLeftNav(!isLeftNav);
    };

    return (
        <div className="page-header">
            
            <div className="row">
                <div className="col-lg">
                    <a className="navigation-toggle" onClick={() => handleLeftNavToggle()}><i className="glyph-menu"></i></a>
                
                    {backLink ? <Link to={backLink}>Back</Link> : <Breadcrumbs account={account} content={content}></Breadcrumbs>}
                    
               
                    <h1>{prefix ? prefix+': ' : ''}{content && content.name}</h1>
                </div>
                
                {doAction &&
                    <div className="col-md-4 col-lg-3 text-end">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Options
                            </button>

                            <ContentMenu account={account} content={content} clipboard={clipboard} doAction={doAction} header={true}></ContentMenu>
                        </div>
                    </div>
                }
            </div>
        </div>
    );

}

function Breadcrumbs({ account, content }) {
    const { data: parents } = ContentData.useFindParents(account.id, content ? content.parentId : 0);

    return (
        <div className="breadcrumbs">
            <>/&nbsp;</>
            
            {content && 
                <>
                    <NavLink className="breadcrumbs-item" to={`/${account.id}/content`}>ROOT</NavLink>&nbsp;/&nbsp;
                </>
            }
            
            {parents && parents.map((breadcrumb, index) =>
                <React.Fragment key={index}>
                    <NavLink className="breadcrumbs-item" to={`/${account.id}/content/${breadcrumb.id}`}>{breadcrumb.name}</NavLink>&nbsp;/&nbsp;
                </React.Fragment>
            )}
        </div>
    )
}

export default PageHeader;