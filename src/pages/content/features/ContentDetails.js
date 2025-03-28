import React, { useState } from 'react';
import { Loader } from '../../../components';
import { CONTENT_SCHEMA, CONTENT_STATUS } from "../constants";
import { datetime } from '../../../helpers';
import cn from "classnames";
import AuthService from '../../../services/AuthService';
import { Link } from 'react-router-dom';

function ContentDetails({account, doAction, content, loading, error}) {
    
    const authUser = AuthService.authUser;

    const copyTextToClipboard = (text) => {
        console.log('clipboard');
        if ('clipboard' in navigator) {
            return navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    return (
        <>
            {loading && <Loader></Loader>}

            {error && (
                <div>{`There is a problem fetching the data - ${error}`}</div>
            )}
        
            {content &&
                <div className="col-md-4 col-lg-3">
                    <div className="content-details">
                        <h5>Details</h5>
                        <div className="panel-group" id="details" role="tablist">
                            <DetailPanel title="General" open={true}>
                                <dl>
                                    <dt>Name</dt>
                                    <dd>{content.name}</dd>
                                    <dt>
                                        URL <a onClick={() => copyTextToClipboard(account.domain+content.guid)}><i className="glyph-clipboard"></i></a>
                                    </dt>
                                    <dd className="text-truncate">
                                        <a href={`${account.domain}${content.guid}`} title={content.guid} target='_blank'>{content.guid}</a>
                                    </dd>
                                    <dt>Status</dt>
                                    <dd>
                                        {CONTENT_STATUS[content.status]}
                                    </dd>
                                    <dt>Type</dt>
                                    <dd>{CONTENT_SCHEMA[content.schema]}</dd>
                                    <dt>Versions</dt>
                                    <dd>
                                        <div>{content.status == 1 ? '1 published' : ''}</div>
                                        <div>{content.sync == 0 ? <span>1 working copy <strong>(unpublished)</strong></span> : ''}</div>
                                        <div>{(content.sync == 1 && content.status != 1) ? <span>1 working copy <strong>(unpublished)</strong></span> : ''}</div>
                                        <div>{content.revisions.length > 0 ? content.revisions.length+' revision(s)' : ''}</div>
                                        <div className="mb-1">{content.autosaves.length > 0 ? content.autosaves.length+' autosave(s)' : ''}</div>
                                        
                                        <Link to={`/${account.id}/content/versions/${content.id}`}>Manage all versions</Link>
                                    </dd>
                                    <dt>Created Date</dt>
                                    <dd>{datetime(content.created)}</dd>
                                    <dt>Last Modified Date</dt>
                                    <dd>{datetime(content.working.editedAt)}</dd>
                                </dl>
                            </DetailPanel>

                            <DetailPanel title="Thumbnail" open={true}>
                                <div className="node-thumb text-center">
                                    <Thumbnail content={content} />
                                </div>
                            </DetailPanel>

                            <DetailPanel title="Tags" open={false}>
                                {content.working.tags && 
                                    <>
                                        {content.working.tags.length > 0 ? 
                                            content.working.tags.map((tag, index) => <span key={index} className="badge text-bg-dark me-1">{tag}</span>)
                                        :
                                            <em>-Empty-</em>
                                        }
                                    </>
                                }
                            </DetailPanel>

                            <DetailPanel title="Excerpt" open={false}>
                                {content.working.excerpt ?? ''}
                            </DetailPanel>
                                
                            <DetailPanel title="User Groups" open={false}>
                                {content && content.groups.map((group, index) =>
                                    <div key={index}>{group.name} ({group.permissions.join(', ')})</div>
                                )}
                            </DetailPanel>

                        </div>

                    </div>
                </div>
            }
      </>
    );
}

function DetailPanel({title, open = false, children}) {
    const [isOpen, setOpen] = useState(open);

    const toggle = () => {
        setOpen(!isOpen);
    };

    return (
        <div className={cn({ 'detail-panel': true, 'open': isOpen })}>
            <h6 className="detail-panel-title"  onClick={toggle}>
                {title}
            </h6>
            <div className="detail-panel-body">
                {children}
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
        return <div className="file-icon file-icon-xl" data-type={content.icon}></div>
}

export default ContentDetails;