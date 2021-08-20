import React from 'react';

const FileInput = () => {
    
    let fileReader;
    let logic = [];

    const handleFileRead = (e) => {
        const content = fileReader.result;
        const substringStart = content.indexOf("[{");
        const substringEnd = content.indexOf("}]") + 2;
        logic = JSON.parse(content.substring(substringStart, substringEnd));
    }

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file)
    }

    return ( 
            <input type="file" onChange={e => handleFileChosen(e.target.files[0])}/>
     );
}
 
export default FileInput;