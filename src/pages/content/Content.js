import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import { ContentData } from '../../data';
import ContentHeader from './features/ContentHeader';
import ContentDetails from './features/ContentDetails';
import ContentTable from './features/ContentTable';
import Actions from './Actions';

function Content() {
    const [account] = useOutletContext();
    const { id = 0 } = useParams();

    const { data: content, setData: setContent, loading: contentLoading, error: contentError } = ContentData.useFind(account.id, id);
    const { data: children, setData: setChildren, childrenLoading, childrenError } = ContentData.useFindAll(account.id, id);

    const [clipboard, setClipboard] = useState([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const [selected, setSelected] = useState([]);
  
    useEffect(() => {
        setIsSelectedAll(false);
        setSelected([]);
    }, [id]);

    const doAction = (action, id, index, checked) => {
        Actions[action](account.id, {
            id, 
            content,
            setContent,
            children, 
            setChildren, 
            clipboard, 
            setClipboard, 
            isSelectedAll, 
            setIsSelectedAll, 
            selected, 
            setSelected, 
            index, 
            checked
        });
    }

    return (
        <div className="main-content cms-page">
            <div className="container-fluid">
                
                <ContentHeader account={account} content={content} clipboard={clipboard} doAction={doAction}></ContentHeader>

                <div className="row">
                    <div className="col-lg">
                        <ContentTable account={account} doAction={doAction} clipboard={clipboard} selected={selected} isSelectedAll={isSelectedAll} children={children} setChildren={setChildren} loading={childrenLoading} error={childrenError}></ContentTable>
                    </div>
                    {id != 0 &&
                        <ContentDetails account={account} doAction={doAction} content={content} loading={contentLoading} error={contentError}></ContentDetails>
                    }
                </div>

            </div>
        </div>
    )
}


export default Content;