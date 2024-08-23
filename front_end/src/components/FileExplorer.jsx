import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Files from './Files';
import fileExplorerData from '../data/fileExplorerData';

function FileExplorer() {
    const [explorerData, setExplorerData] = useState(fileExplorerData);
    !localStorage.getItem('fileExplorerData') && localStorage.setItem('fileExplorerData', JSON.stringify(explorerData));
    const [selectedFileId, setSelectedFileId] = useState(null);
    const fileData = JSON.parse(localStorage.getItem('fileExplorerData'));
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <Sidebar 
                        explorerData={fileData} 
                        setExplorerData={setExplorerData}
                        setSelectedFileId={setSelectedFileId}
                        isNested={false} 
                    />
                </div>
                <div className="col-10">
                    {selectedFileId && (
                        <Files 
                            fileData={fileData} 
                            id={selectedFileId} 
                            setSelectedFileId={setSelectedFileId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileExplorer;
