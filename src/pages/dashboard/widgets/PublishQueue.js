import React from 'react';
import { Loader } from '../../../components';
import { ContentData } from '../../../data';
import { Link } from 'react-router-dom';

function PublishQueue({account}) {

    const { data: items, loading: loading, error: error } = ContentData.useFindPending(account.id);
    
    return  (
        <>
            {loading && <Loader></Loader>}

            {error && (
                <div>{`There is a problem fetching the data - ${error}`}</div>
            )}
        
            {items &&
                <div className="card mb-3">
                    <div className="card-header">Recent Drafts</div>
                    <div className="list-group list-group-flush">
                        {items.slice(0, 4).map(item => 
                            <Link key={item.id} to={`/${account.id}/content/${item.id}`} className="list-group-item list-group-item-action">{item.name}</Link>
                        )}
                        
                        <HasMore items={items} />
                    </div>
                </div>
        }
        </>
    )     
            
}

function HasMore({items}) {
    const slice = items.slice(4);
    if (slice.length > 0) {
        return <a className="list-group-item list-group-item-action">+{slice.length} more</a>
    }

    return <></>;
}

export default PublishQueue;