import React from 'react';

function Files({ fileData, id }) {
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

    const file = findFileById(fileData, id);

    return (
        <section>
            {file ? (
                <div>
                    {file.data}
                </div>
            ) : (
                <div>No content available</div>
            )}
        </section>
    );
}

export default Files;
