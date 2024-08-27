import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Sidebar({ explorerData, setExplorerData, setSelectedFileId, isNested = false }) {
    
    const [openFolders, setOpenFolders] = useState({});
    const [showInput, setShowInput] = useState({
        isInput : false,
        folderId : null,
        type : 'folder'
    });

    const handleShow = (id) => {
        //so logic is basically openFolders is object containes data like { id_1 : true, id_2 : false.....}
        //so if particular id is true it will be false and vice versa
        setOpenFolders((prevOpenFolders) => ({
            ...prevOpenFolders,
            [id]: !prevOpenFolders[id]
        }));
    };

    const foundItem = (data, id) => {
        const item = data.find(item => item.id === id);
        if (item) return item;
        for (const item of data) {
            if (item.children) {
                const found = foundItem(item.children, id);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    };
    
    const handleAdd = (data, id, isFolder) => {
        const item = foundItem(explorerData, id);
        if(isFolder){
            const newitem = {
                id : uuidv4(),
                isFolder : true,
                name : data,
                children : []
            }
            if(item){
                item.children.unshift(newitem);
            }
            console.log(explorerData);
            console.log(item);
            setOpenFolders((prevOpenFolders) => ({
                ...prevOpenFolders,
                [id]: true
            }));
        }else{
            const newFile = {
                id : uuidv4(6),
                name : data,
                data : '',
                isFolder : false
            }
            if(item){
                item.children.unshift(newFile);
            }
            console.log(item, "file");
        }
        console.log(explorerData);
        localStorage.setItem('fileExplorerData', JSON.stringify(explorerData));
    }

    const onAddFolder = (e, id, isFolder) => {
        if(e.keyCode === 13 && e.target.value){
            handleAdd(e.target.value, id, isFolder);
            setShowInput({
                ...showInput,
                isInput : !showInput.isInput
            });
    }}

    const openFile = (id) => {
        console.log(id);
        setSelectedFileId(id);
    };

    return (
        <section className="container-flushowInput">
            <div className="row d-flex">
                <div className={isNested ? 'col-12 justify-content-end' : 'col-12'}>
                    {explorerData.map((item) => (
                        <div key={item.id}>
                            <p 
                                className='d-flex align-items-center justify-content-between my-2 bg-secondary-subtle py-2 px-2' 
                                style={{ cursor: 'pointer' }}
                            >
                                <span 
                                    className='border-start border-black border-1 d-flex'
                                    onClick={() => item.isFolder ? handleShow(item.id) : openFile(item.id)}
                                >
                                    <span className='mx-2'>{item.isFolder ? '📁' : '📄'}</span>
                                    <span>{item.name}</span>
                                </span>
                                <span>
                                    {item.isFolder && (
                                        <>
                                            <button className="btn btn-sm btn-outline-dark mx-1" onClick={() => setShowInput({
                                                    isInput: true,
                                                    folderId: item.id,
                                                    type: 'folder'
                                                })}>Folder +</button>
                                            <button className="btn btn-sm btn-outline-dark" onClick={() => setShowInput({
                                                    isInput: true,
                                                    folderId: item.id,
                                                    type: 'file'
                                                })}>File +</button>
                                        </>
                                    )}
                                </span>
                            </p>

                            {showInput.isInput && (showInput.folderId === item.id) ?
                                <div>
                                    <span>{showInput.type === 'folder' ? '📁' : '📄'}</span> 
                                    <input 
                                        type="text" 
                                        autoFocus
                                        name="addFile" 
                                        id="addFile" 
                                        onBlur={() =>  setShowInput({
                                            isInput: false,
                                            folderId: null,
                                            type: 'folder'
                                        })}
                                        onKeyDown={(e) => onAddFolder(e, item.id, showInput.type === 'folder' ? true : false)}
                                    />
                                </div> : ''
                            }

                            {openFolders[item.id] && item.isFolder && item.children && item.children.length > 0 && (
                                <div className="ps-2">
                                    <Sidebar key={item.children.id} explorerData={item.children} isNested={true} setSelectedFileId={setSelectedFileId} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Sidebar;