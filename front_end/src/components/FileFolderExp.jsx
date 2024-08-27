import React, { useEffect, useState } from 'react';
import fileExplorerData from '../data/fileExplorerData';
import SidePanel from './SidePanel';
import FilePanel from './FilePanel';

function FileFolderExp() {

    const [ fileData, setFileData ] = useState(fileExplorerData);
    const [ openFileId, setOpenFileId ] = useState(null);

    // useEffect(() => {
        !localStorage.getItem('fileData') && localStorage.setItem('fileData', JSON.stringify(fileData));
    // }, [])
    const fileExpData = JSON.parse(localStorage.getItem('fileData'));
    
    return (
        <>
            <section className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <SidePanel 
                            fileData={fileExpData}
                            setFileData={setFileData}
                            setOpenFileId={setOpenFileId}
                        />
                    </div>
                    <div className="col-10">
                        {openFileId && 
                            <FilePanel 
                                fileData={fileExpData}
                                setFileData={setFileData}
                                setOpenFileId={setOpenFileId}
                                id={openFileId}
                            />
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default FileFolderExp;
