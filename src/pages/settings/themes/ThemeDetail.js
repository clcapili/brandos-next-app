import React, {useState, useEffect} from 'react';
import __ from '@foragefox/doubledash'
import { Loader, PageHeader } from '../../../components';
import { useOutletContext, useParams } from "react-router-dom";
import ThemeData from '../../../data/ThemeData';

export const THEME_STATUS = {
    1: 'DRAFT',
    2: 'UNDER REVIEW',
    3: 'PUBLISHED'
};

function ThemeDetail() {
    const [account] = useOutletContext();
    const { id } = useParams();
    const { data: theme, error, loading } = ThemeData.useFind(account.id, id);

    return (
        <div className="main-content">
            <div className="container-fluid">

                <section>
                    {loading && <Loader></Loader>}
                    
                    {error && (
                        <div>{`There is a problem fetching the data - ${error}`}</div>
                    )}

                    {theme ?
                            <div className="row">
                                <div className="col">

                                    <PageHeader title={theme.name} thumbnail={theme.thumbnail}>
                                        {account.themeId == theme.id ? <small className="text-primary-emphasis">ACTIVE</small> : <small>&nbsp;</small>}
                                   
                                        <div><small className="badge text-bg-dark">{THEME_STATUS[theme.status]}</small></div>
                                    </PageHeader>

                                    <div className="theme-options">
                                        <Options path={theme.config.editor.options}></Options>
                                    </div>
                                    
                                </div>
                            </div>
                        :
                        <h3 className="text-center my-5">No theme found</h3>
                    }
                </section>
            </div>
        </div>
    )
}

function Options({path}) {
    const [options, setOptions] = useState();

    useEffect(()=>{
        fetch(path, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            }
        )
        .then(response => response.json())
        .then(data => setOptions(data));
    },[])

    return options ? <OptionProperty value={options} top={true} /> : <></>
}


function OptionProperty({value, top, inline}) {
    if (__.lang.isObject(value) && top)
        return <TopObject value={value} />
    else if (__.lang.isObject(value))
        return <ObjectItem value={value} inline={inline} />
    else if (__.lang.isArray(value))
        return <ArrayItem value={value} inline={inline} />
    else
        return <Item value={value} />
}


function TopObject({value}) {
    return <>
        {Object.keys(value).map((key, index) => 
            <div key={index} className="row border-bottom mb-1">
                <div className="col-2"><strong>{key}</strong></div>
                <div className="col"><OptionProperty value={value[key]} /></div>
            </div>
        )}
    </>
}

function ObjectItem({value, inline}) {
    if (Object.keys(value).length == 0) {
        return <>{}</>
    }

    if (inline) {
        return <>
            {`{`}
                {Object.keys(value).map((key, index) => 
                    <span key={index} className="inline-array-item">
                        <strong>{key}:</strong> <OptionProperty value={value[key]} />
                    </span>
                )}
            {`}`}
        </>
    }

    return <>
        {`{`}
            <ul>
                {Object.keys(value).map((key, index) => 
                    <li key={index} className="tab-level-1">
                        <div key={index} className="row g-1">
                            <div className="col-fixed"><strong>{key}:</strong> </div>
                            <div className="col"><OptionProperty value={value[key]} inline={['layoutCols', 'fields', 'bgColor', 'color', 'bl', 'br', 'tl', 'tr', 'visibility', 'columns'].includes(key)} /></div>
                        </div>
                    </li>
                )}
            </ul>
        {`}`}
    </>
}

function ArrayItem({value, inline}) {
    if (value.length == 0) {
        return <>[]</>
    }

    if (inline) {
        return <>
            [
                {value.map((value, index) => 
                    <span key={index} className="inline-array-item"><OptionProperty value={value} /></span>
                )}
            ]
        </>
    }

    return <>
        [
            <ul>
                {value.map((value, index) => 
                    <div key={index} className="mb-1">
                        <OptionProperty value={value} />
                    </div>
                )}
            </ul>
        ]
    </>
}

function Item({value}) {
    if (__.lang.isUndefined(value)) {
        return <>&nbsp;</>
    }

    if (!__.lang.isString(value)) {
        return <>{value}</>
    }

    if (value.startsWith('#') || value.startsWith('rgb(')  || value.startsWith('rgba(')) {
        return <span><span className="colorbox" style={{background: value}}></span> {value}</span>
    } else if (value.startsWith('linear-gradient(')) {
        return <span><span className="colorbox" style={{backgroundImage: value}}></span> {value}</span>
    } else if (value.startsWith('<svg ')) {
        return <span><span className="iconbox" dangerouslySetInnerHTML={{ __html: value }}></span> {value}</span>
    }

    return <>{value}</>
}


export default ThemeDetail;