import ContentTrashData from "../../data/ContentTrashData";

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

function bulkTrash(accountId, { children, setChildren, setSelected, setIsSelectedAll, selected }) {
    let promises = [];

    for (let i = 0; i < selected.length; i++) {
        promises.push(ContentTrashData.permanentlyDelete(accountId, selected[i]));
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

function bulkRestore(accountId, { children, setChildren, setSelected, setIsSelectedAll, selected }) {
    let promises = [];
 
    for (let i = 0; i < selected.length; i++) {
        promises.push(ContentTrashData.restore(accountId, selected[i]));
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

export default {
    selectAll,
    select,
    bulkTrash,
    bulkRestore
};