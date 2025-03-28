import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import { ContentData } from '../../data';

function ContentBrowser({onClose, onSelect}) {
    const [account] = useOutletContext();
    const [selected, setSelected] = useState();

    useEffect(() => {
        // Component mounted
        document.body.classList.add('content-browser-open');
        
        return () => {
            // Component unmounted
            document.body.classList.remove('content-browser-open'); 
        };

    }, []);

    return (
        <div className="content-browser open">
            <div className="content-browser-dialog">
                <div className="content-browser-content">
                    <div className="content-browser-body">
                        <Window accountId={account.id} setSelected={setSelected}></Window>
                    </div>
                    <div className="content-browser-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => onClose()}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => onSelect(selected)} disabled={!selected ? 'disabled' : ''}>Select</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Window({accountId, setSelected}) {
    const windowElement = useRef();
    const [columns, setColumns] = useState([0]);
    const [width, setWidth] = useState(400);
   // const [offset, setOffset] = useState(0);

    const onSelected = (content) => {
        const newColumns = [];

        for (let i = 0; i < columns.length; i++) {
            // loop and add to newColumns
            newColumns.push(columns[i]);

            // until you find your parent then stop adding to newColumns
            if (columns[i] === content.parentId) {
                break;
            }
        }

        // add the id
        newColumns.push(content.id);

        setColumns(newColumns);

        setSelected(content);

        const calculatedWidth = 200 * newColumns.length + 1;
        setWidth(calculatedWidth);

        scroll();
    }

    useEffect(() => {
        if (columns) {
            let offset = columns.length*200;
         
            windowElement.current.scrollLeft = offset;
        }
    }, [columns])

    return (
        <div className="content-browser-window" ref={windowElement}>
            <ul className="browser" style={{ width: width }}>
                {columns.map((id, index) =>
                    <Column key={index} accountId={accountId} parentId={id} onSelected={onSelected} columns={columns}></Column>
                )}
            </ul>
        </div>
    );
}

function Column({accountId, parentId, onSelected, columns}) {
    const {data: children, loading, error } = ContentData.useFindAll(accountId, parentId);

    return (
        <>
            {children && children.length > 0 &&
                <li className="column">
                    <ul>
                        {children.map((content, index) =>
                             <li key={index} className={columns.includes(content.id) ? 'selected' : ''}>
                                <i className="file-icon file-icon-xs" data-type={content.icon}></i>
                                <a onClick={() => onSelected(content)} data-guid={content.guid} data-id={content.id}>
                                    {content.name}
                                </a>
                            </li>
                        )}
                    </ul>
                </li>
            }
        </>
    );
}

export default ContentBrowser;