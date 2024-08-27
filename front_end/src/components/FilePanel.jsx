import React, { useState } from 'react';

function FilePanel({ fileData, setFileData, setOpenFileId, id }) {
    const [ updateInput, setUpdateInput ] = useState(false);
    const [ fileFormData, setFileFormData ] = useState('');
    const [ text, setText ] = useState(false);
    const findFileById = (data, id) => {
        for (const item of data) {
            if (item.id === id && !item.isFolder) {
                return item;
            }
            if (item.children) {
                const found = findFileById(item.children, id);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    };
    const handleCloseFile = () => {
        setOpenFileId(null);
    }
    let file = findFileById(fileData, id);
    const handleInput = () => {
        setUpdateInput(!updateInput);
        setFileFormData(file?.data);
        setText(false)
    }
    const updateFileData = (data, id, newData) => {
        return data.map(item => {
            if (item.id === id && !item.isFolder) {
                return {
                    ...item,
                    data: newData
                };
            }
            if (item.children && item.isFolder) {
                return {
                    ...item,
                    children: updateFileData(item.children, id, newData)
                };
            }
            return item;
        });
    };    
    const handleFileForm = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            const newFileData = updateFileData(fileData, file?.id, e.target.value);
            setFileData(newFileData); 
            console.log(newFileData, "new");
            localStorage.setItem('fileData', JSON.stringify(newFileData));
            setUpdateInput(!updateInput);
        }
    };
    console.log(fileData, 'data');
    
    return (
        <>
            <section className="col-10 bg-secondary-subtle p-5">
                {file && 
                    <div>
                        <div className='d-flex justify-content-between'>
                            <h1>{file.name}</h1>
                            <span
                                onClick={handleCloseFile} 
                                style={{cursor : 'pointer'}}
                            >
                                ✖
                            </span>
                        </div>
                        
                        { !file?.data &&
                            <p
                                className='pt-3'
                                onClick={() => handleInput()}
                                style={{cursor : 'pointer'}}
                            >
                                Add data...
                            </p>
                        }
                        {updateInput ? 
                            <textarea 
                                autoFocus
                                className="form-control" 
                                cols={5} 
                                rows={7} 
                                aria-label="With textarea"
                                value={fileFormData}
                                onChange={(e) => setFileFormData(e.target.value)}
                                onKeyDown={(e) => handleFileForm(e)}
                            />
                             :  <p 
                                    onClick={() => handleInput()}
                                    onMouseOver={() => setText(true)}
                                    onMouseLeave={() => setText(false)}
                                    style={{cursor : 'pointer'}}
                                >
                                    {file.data}
                                </p>
                        }
                        {text && <p className='bg-secondary p-2 position-absolute' style={{width : '250px'}}>Click to update data and press enter to submit changes.</p>}
                    </div> 
                }
            </section>
        </>
    )
}

export default FilePanel;