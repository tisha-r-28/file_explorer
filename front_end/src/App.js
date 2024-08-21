import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import fileExplorerData from "./data/fileExplorerData";

function App() {
    const [ explorerData, setExplorerData ] = useState(fileExplorerData);
    return (
        <>
            <Sidebar explorerData={explorerData} setExplorerData={setExplorerData}/>
        </>
    );
}

export default App;