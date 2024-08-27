import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

function SidePanel({ fileData, setFileData, setOpenFileId }) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        id: null,
        visible: false
    })

    const handleOpenFile = (id) => {
        setOpenFileId(id);
    }

    const showAddInput = (id, isFolder) => {
        setShowInput({
            ...showInput,
            id: id,
            visible: true,
            isFolder: isFolder
        })
    }

    const addFileOrFolder = (data, fileOrFolName = 'file', parentId, isFolder) => {
        const newFile = {
            id: uuidv4(),
            name: fileOrFolName,
            isFolder: false,
            items: 0,
            data: ''
        };
        
        const newFolder = {
            id: uuidv4(),
            name: fileOrFolName,
            items: 0,
            isFolder: true,
            children: []
        };
    
        return data.map(item => {
            if (item?.id === parentId && item?.isFolder) {
                return {
                    ...item,
                    children: [isFolder ? newFolder : newFile, ...(item.children || [])]
                };
            } else if (item?.id !== parentId && item?.children) {
                return {
                    ...item,
                    children: addFileOrFolder(item.children, fileOrFolName, parentId, isFolder)
                };
            } else {
                return item;
            }
        });
    };

    const handleAdd = (e, parentId, isFolder) => {
        console.log("parentId", parentId)
        if (e.keyCode === 13 && e.target.value) {
            const addedFileOrFol = addFileOrFolder(fileData, e.target.value, parentId, isFolder);
            console.log("addedFileOrFol", addedFileOrFol)
            setFileData(addedFileOrFol);
            localStorage.setItem('fileData', JSON.stringify(addedFileOrFol))
            console.log(addedFileOrFol, 'data');
            setExpand(true);
            setShowInput({
                id: null,
                visible: false
            })
        }
    }
    console.log("fileData", fileData)
    return (
        <>
            <section className="container-fluid">
                <div className="row">
                    <div className='col-12'>
                        {fileData?.map((item) => {
                            return (
                                <div key={item?.id}>
                                    <div className="bg-secondary-subtle d-flex align-items-center justify-content-between px-3 my-2">
                                        <p
                                            className='pt-3'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => item?.isFolder ? setExpand(!expand) : handleOpenFile(item?.id)}
                                        >
                                            <span className='fs-5 pe-1'>
                                                {item?.isFolder ? '📁' : '📄'}
                                            </span>
                                            <span>{item?.name}</span>
                                        </p>
                                        {item?.isFolder &&
                                            <div className="d-flex align-items-center">
                                                <button
                                                    className="btn btn-sm btn-outline-dark mx-1"
                                                    onClick={() => showAddInput(item?.id, true)}
                                                >
                                                    Folder +
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-dark mx-1"
                                                    onClick={() => showAddInput(item?.id, false)}
                                                >
                                                    File +
                                                </button>
                                            </div>
                                        }
                                    </div>
                                    {
                                        (showInput.id === item?.id && showInput?.visible) &&
                                        <div>
                                            <span className='pe-2 fs-5'>{showInput.isFolder ? '📁' : '📄'}</span>
                                            <input
                                                type="text"
                                                name="addData"
                                                id="addData"
                                                autoFocus
                                                onBlur={() => setShowInput({
                                                    id: null,
                                                    visible: false
                                                })}
                                                onKeyDown={(e) => handleAdd(e, item?.id, showInput.isFolder)}
                                            />
                                        </div>
                                    }
                                    {(expand && item?.children) &&
                                        <SidePanel
                                            fileData={item?.children}
                                            setFileData={setFileData}
                                            setOpenFileId={setOpenFileId}
                                        />
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

SidePanel.propTypes = {
    fileData: PropTypes.array,
    setFileData: PropTypes.func,
    setOpenFile: PropTypes.func
}

export default SidePanel;