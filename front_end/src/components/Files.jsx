import React from 'react';

function Files({ fileData, id, setSelectedFileId }) {
    // Recursive function to find the file by ID
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

    const handleClose = () => {
        setSelectedFileId(null)
    }

    const file = findFileById(fileData, id);

    return (
        <section className="col-10 bg-secondary-subtle p-5">
            {file ? (
                <div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1 className="fs-2 text-center">{file.name}</h1>
                        <span style={{cursor : 'pointer'}} onClick={handleClose}>✖</span>
                    </div>
                    <p className='pt-4'> {file?.data ? file.data : 'No content available'} </p>
                </div>
            ) : (
                <div>No content available</div>
            )}
        </section>
    );
}

export default Files;
