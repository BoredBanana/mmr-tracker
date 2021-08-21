import React, { useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext.js';

import { startingItemIdOrder } from '../util/item id arrays.js';

const FileInput = () => {
    
    const {items, dispatchItems} = useContext(ItemContext);

    let fileReader;
    let logic = [];
    let settings;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        const logicSubstringStart = content.indexOf("[{");
        const logicSubstringEnd = content.indexOf("}]") + 2;
        logic = JSON.parse(content.substring(logicSubstringStart, logicSubstringEnd));

        const settingsSubstringStart = content.indexOf(">{") + 1;
        const settingsSubstringEnd = content.indexOf("}<") + 1;
        settings = JSON.parse(content.substring(settingsSubstringStart, settingsSubstringEnd));

        // console.log(logic);
        // console.log(settings);
        const startingItemBinaryArray = parseSettingsString(settings.CustomStartingItemListString);

        startingItemBinaryArray.forEach((flag, index) => {
            const itemId = startingItemIdOrder[index];
            const item = items.find(item => item.ItemId === itemId);
            item.Acquired = flag;
        });

        dispatchItems({type: 'SET_ITEMS', items});
    }

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file)
    }

    const parseSettingsString = (string) => {
        const sections = string.split("-").reverse();
        console.log(sections);
        let parsedArray = [];

        sections.forEach((section, index) => {
            let binaryString;
            if(section.length === 0) {
                binaryString = "00000000000000000000000000000000";
            }
            else {
                binaryString = parseInt(section, 16).toString(2);
            }

            if(index !== sections.length - 1) {
                binaryString.padStart(32, 0);
            }

            console.log(binaryString, section);

            for(let i = binaryString.length - 1; i >= 0; --i) {
                const binaryFlag = (binaryString.charAt(i) === '1') ? true : false;
                parsedArray.push(binaryFlag);
            }
        });
        
        return parsedArray;
    }

    return ( 
            <input type="file" onChange={e => handleFileChosen(e.target.files[0])}/>
     );
}
 
export default FileInput;