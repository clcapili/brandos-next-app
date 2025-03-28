import { ContentData } from '../../data';

function sort(accountId, {children}) {
    const list = [];
    for (let i = 0; i < children.length; i++) {
        list.push(
            { 
                id: children[i].id,
                sort: i + 1
            }
        );
    }

    ContentData.sort(accountId, list);
}
    
function publish(accountId, {id, children, setChildren, content, setContent, index}) {
   
    ContentData.publish(accountId, id)
        .then(() => {
            let items = [...children];
            
            // table view
            if (items[index]) {
                let item = {...items[index]}
           
                item.sync = true;
                item.status = 1;
                items[index] = item;
                setChildren(items);
            } else {
                let item = {...content}
                item.sync = true;
                item.status = 1;
                
                setContent(item);
            }
          
        })
        .catch((error) => {
            console.log(error);
        })
}

function unpublish(accountId, {id, children, setChildren, content, setContent, index}) {
    ContentData.unpublish(accountId, id)
        .then(() => {
            let items = [...children];

            // table view
            if (items[index]) {
                let item = {...items[index]}

                item.status = 0;
                items[index] =  item;
                setChildren(items);
            } else {
                let item = {...content}
                item.status = 0;

                setContent(item);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

function copy(accountId, {id, setClipboard}) {
    setClipboard([id]);
}

function paste(accountId, {id, clipboard, setClipboard, children, setChildren, index}) {
    const newClipboard = [...clipboard];
    let promises = [];
 
    // do clone with new parent id option
    for (let i = 0; i < newClipboard.length; i++) {
        promises.push(ContentData.clone(accountId, newClipboard[i], id));
    }
         
    Promise.all(promises)
        .then((payloads) => {
            if (index === 0) {
                let items = [...children];
                for (let i = 0; i < payloads.length; i++) {
                    items.splice(0, 0, payloads[i].entry);
                }
                
                setChildren(items);
            }
 
            setClipboard([]);
        })
        .catch((error) => {
            console.log(error);
        });
}
     
function duplicate(accountId, {id, children, setChildren, index}) {
      ContentData.clone(accountId, id)
        .then((payload) => {
            let item = payload.entry;
            let items = [...children];
            items.splice(index+1, 0, item);
            setChildren(items);
        })
        .catch((error) => {
            console.log(error);
        });

}

function trash(accountId, {id, children, setChildren, index}) {
    ContentData.trash(accountId, id)
        .then(() => setChildren(children.filter((v, i) => i !== index)))
        .catch((error) => {
            console.log(error);
        })
}

function selectAll(accountId, {isSelectedAll, setIsSelectedAll, setSelected, children}) {
    setIsSelectedAll(!isSelectedAll);
    setSelected(children.map(item => item.id));
    if (isSelectedAll) {
        setSelected([]);
    }
}

function select(accountId, { id, selected, setSelected, checked }) {
    setSelected([...selected, id]);
    if (!checked) {
        setSelected(selected.filter(item => item !== id));
    }
};

function bulkCopy(accountId, { setClipboard, selected }) {
    setClipboard(selected);
}

function bulkTrash(accountId, { children, setChildren, setSelected, setIsSelectedAll, selected }) {
    let promises = [];
 
    // do clone with new parent id option
    for (let i = 0; i < selected.length; i++) {
        promises.push(ContentData.trash(accountId, selected[i]));
    }
    
    Promise.all(promises)
        .then(() => {
 
            setChildren(children.filter((v, i) => !selected.includes(v.id)))
 
            setSelected([])
            setIsSelectedAll(false);
            
        })
        .catch((error) => {
            console.log(error);
        });
 
}

function restoreAutosave(accountId, { id, content, setContent }) {
    ContentData.restoreAutosave(accountId, id)
        .then(() => {
            let item = {...content};
            item.autosaves = [];
            setContent(item);
        })
        .catch((error) => {
            console.log(error);
        })
}

export default {
    sort,
    publish,
    unpublish,
    copy,
    paste,
    duplicate,
    trash,
    selectAll,
    select,
    restoreAutosave,
    bulkCopy,
    bulkTrash
};