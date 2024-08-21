import React, { useState } from 'react';

function Sidebar({ explorerData, setExplorerData, isNested = false }) {
    // State to track which folders are open
    const [openFolders, setOpenFolders] = useState({});
    const [ showInput, setShowInput ] = useState(false);

    // Handle showing or hiding folder children
    const handleShow = (id) => {
        setOpenFolders((prevOpenFolders) => ({
            ...prevOpenFolders,
            [id]: !prevOpenFolders[id]
        }));
    };

    const foundItem = (data, id) => {
        const item = data.find(item => item.id === id);
        if (item) return item;
        for (const item in data){
            if(item.children){
                const found = foundItem(item.children, id);
                if(found){
                    return found;
                }
            }
        }
        return null;
    }

    const addFolder = (id) => {
        console.log(id);
        const foundedItem = foundItem(explorerData, id);
        console.log(foundedItem);
        setShowInput(!showInput);
        // setExplorerData({
        //     ...explorerData,
        //     isFolder : true,
        //     name : 'folder'
        // })
    }

    if (!localStorage.getItem('fileExplorerData')) {
        localStorage.setItem('fileExplorerData', JSON.stringify(explorerData));
    }

    const fileData = JSON.parse(localStorage.getItem('fileExplorerData'));

    return (
        <section className="container-flushowInput">
            <div className="row">
                <div className={isNested ? 'col-12 justify-content-end' : 'col-2'}>
                    {explorerData.map((item) => (
                        <div key={item.id}>
                            <p 
                                className='d-flex align-items-center justify-content-between my-2 bg-secondary-subtle py-2 px-2' 
                                style={{cursor: 'pointer'}}
                            >
                                <span 
                                    className='border-start border-black border-1 d-flex'
                                    onClick={() => item.isFolder ? handleShow(item.id) : undefined}
                                >
                                    <span className='mx-2'>{item.isFolder ? '📁' : '📄'}</span>
                                    <span>{item.name}</span>
                                </span>
                                <span>
                                    {item.isFolder && (
                                        <>
                                            <button className="btn btn-sm btn-outline-dark mx-1" onClick={() => addFolder(item.id)}>Folder +</button>
                                            <button className="btn btn-sm btn-outline-dark">File +</button>
                                        </>
                                    )}
                                </span>
                            </p>

                            <div className={showInput ? 'd-block' : 'd-none'}>
                                <span>{item.isFolder ? '📁' : '📄'}</span> 
                                <input type="text" name="addFile" id="addFile" autoFocus/>
                            </div>

                            {openFolders[item.id] && item.isFolder && item.children && item.children.length > 0 && (
                                <div className="ps-2">
                                    <Sidebar explorerData={item.children} isNested={true} />
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
