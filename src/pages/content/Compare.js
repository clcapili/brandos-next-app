import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import { ContentData, UserData } from '../../data';
import { Loader } from '../../components';
import ContentHeader from './features/ContentHeader';
import { datetime } from '../../helpers';

function Compare() {
    const [account] = useOutletContext();
    const { id = 0, version, revisionId } = useParams();
    const [compare, setCompare] = useState();

    const { data: content, loading: loading, error: error } = ContentData.useFind(account.id, id);

    return (
        <div className="main-content">
            <div className="container">
                
                {loading && <Loader></Loader>}

                {error && (
                    <div>{`There is a problem fetching the data - ${error}`}</div>
                )}

                {content &&
                    <>
                        <ContentHeader account={account} content={content} prefix="Compare" backLink={`/${content.accountId}/content/${content.id}`}></ContentHeader>

                        <General column1={content.live} column2={content.working} />
                    </>
                }
            </div>
        </div>
    )
}

function General({column1, column2}) {
    return (<></>)
}

export default Compare;