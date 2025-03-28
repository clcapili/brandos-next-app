import React from 'react';
import { Link } from "react-router-dom";
import { CONTENT_SCHEMA } from "../../constants";
import cn from "classnames";

// sync=true | status=published - UnPublish
// sync=true | status=draft - Publish

// sync=false | status=published - Publish | UnPublish
// sync=false | status=draft - Publish

function PublishLink({content, onClick}) {

    if (content.sync && content.status == 0) {
        return  <a className="dropdown-item" onClick={onClick}>Publish</a>;
    } else if (!content.sync && content.status == 0) {
        return  <a className="dropdown-item" onClick={onClick}>Publish</a>;
    } else if (!content.sync && content.status == 1) {
        return  <a className="dropdown-item" onClick={onClick}>Publish</a>;
    } 
    
    return <></>;
}

function UnpublishLink({content, onClick}) {

    if (content.sync && content.status == 1) {
        return <a className="dropdown-item" onClick={onClick}>Unpublish</a>
    } else if (!content.sync && content.status == 1) {
        return <a className="dropdown-item" onClick={onClick}>Unpublish</a>
    } 

    return <></>;
}

function ContentMenu({ account, content, clipboard, doAction, header, index }) {
    
    return  (
        <div className="dropdown-menu dropdown-menu-dark">
            {content ?
                <>
                    <Link className="dropdown-item" to={`/${account.id}/content/update/${content.id}`}>Edit {CONTENT_SCHEMA[content.schema]}</Link>
                      
                    <PublishLink content={content} onClick={() => doAction('publish', content.id, index)}></PublishLink>
                    <UnpublishLink content={content} onClick={() => doAction('unpublish', content.id, index)}></UnpublishLink>

                    <div className="dropdown-divider"></div>

                    {content.schema == 'page' && 
                        <>
                            <a className="dropdown-item" href={`/editor.html?accountId=${account.id}&id=${content.id}`}>Page Builder</a>
                            <div className="dropdown-divider"></div>
                        </>
                    }

                    {content.schema == 'pattern' && 
                        <>
                            <a className="dropdown-item" href={`/editor.html?accountId=${account.id}&id=${content.id}&pattern=true`}>Page Builder</a>
                            <div className="dropdown-divider"></div>
                        </>
                    }

                    {content.schema != 'file' && content.schema != 'pattern' &&
                        <>
                            <Link className="dropdown-item" to={`/${account.id}/content/create/file/${content.id}`}>Add File</Link>
                            <Link className="dropdown-item" to={`/${account.id}/content/create/folder/${content.id}`}>Add Folder</Link>
                            <Link className="dropdown-item" to={`/${account.id}/content/create/page/${content.id}`}>Add Page</Link>
                            <div className="dropdown-divider"></div>
                        </>
                    }

                    <a className="dropdown-item" onClick={() => doAction('copy', content.id)}>Copy</a>
                    <a className={cn({'dropdown-item': true, 'disabled': clipboard.length == 0 })} onClick={() => doAction('paste', content.id, (header ? 0 : null) )}>Paste</a>
                    <a className="dropdown-item" onClick={() => doAction('duplicate', content.id, index)}>Duplicate</a>
                    <a className="dropdown-item" onClick={() => doAction('trash', content.id, index)}>Delete</a>
                    <div className="dropdown-divider"></div>
                
                    <Link className="dropdown-item" to={`${account.domain}${content.guid}`} target="_blank">View</Link>
                    <div className="dropdown-divider"></div>
    
                    <a className="dropdown-item disabled">Export</a>
                </>
                :
                <>
                    <Link className="dropdown-item" to={`/${account.id}/content/create/file`}>Add File</Link>
                    <Link className="dropdown-item" to={`/${account.id}/content/create/folder`}>Add Folder</Link>
                    <Link className="dropdown-item" to={`/${account.id}/content/create/page`}>Add Page</Link>
                    <div className="dropdown-divider"></div>
                    <a className={cn({'dropdown-item': true, 'disabled': clipboard.length == 0 })} onClick={() => doAction('paste', 0, 0)}>Paste</a>
                </>
            }
        </div>
    )
}

export default ContentMenu;