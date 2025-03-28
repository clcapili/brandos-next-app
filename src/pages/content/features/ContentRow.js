import React from 'react';
import { Link } from "react-router-dom";
import { CONTENT_SCHEMA, CONTENT_STATUS } from "../constants";
import ContentMenu from './menus/ContentMenu';

function ContentRow({ index, account, content, clipboard, selected, doAction }) {
    
    const handleSelect = (event) => {
        doAction('select', parseInt(event.target.value), -1, event.target.checked);
    };

    return (
        <div className="list-table-row" data-id={content.id}>
            <div className="col-control">
                <label>
                    <input type="checkbox" value={content.id} onChange={(event) => handleSelect(event)} checked={selected.includes(content.id)} />
                </label>
            </div>
            <div className="col col-title">
                <div className="thumbnail">
                    <Thumbnail content={content} />
                </div>
                <div>
                    <Link className="title" to={`/${account.id}/content/${content.id}`}>{content.sync ? content.live.name : content.working.name}</Link>
                    <div className="subtitle">
                        {CONTENT_SCHEMA[content.schema]}
                        {(!content.sync) && <> &#x2022; Unpublished Changes</>}
                    </div>
                </div>
            </div>
            <div className="col-2">
                {CONTENT_STATUS[content.status]}
            </div>
            <div className="col-action">
                <Link className="action-link" to={`${account.domain}${content.guid}`} target="_blank"><i className="glyph glyph-visibility"></i></Link>
            </div>
            <div className="col-action">
                <div className="dropdown">
                    <a className="action-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="glyph glyph-more-vert"></i>
                    </a>
                    <ContentMenu index={index} account={account} content={content} clipboard={clipboard} doAction={doAction}></ContentMenu>
                </div>
            </div>
        </div>
    );
}

function Thumbnail({content}) {
    if (content.working.thumbnail)
        return <img src={content.working.thumbnail.path} />
    else if (content.icon == 'svg')    
        return <img src={content.working.sizes.original.path} />
    else    
        return <div className="file-icon" data-type={content.icon}></div>
}

export default ContentRow;