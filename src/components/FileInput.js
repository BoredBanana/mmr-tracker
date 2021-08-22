// import componets and contexts
import React, { useState, useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext.js';

// array of item ids that correspond to the starting item string
import { startingItemIdOrder } from '../util/item id arrays.js';

const FileInput = () => {
    
    // setup states and context. will save logic array and settings
    // object and interact with item and location contexts
    const {items, dispatchItems} = useContext(ItemContext);
    const [logic, setLogic] = useState([]);
    const [settings, setSettings] = useState({});

    // generate a file reader to scan the uploaded file
    let fileReader;


    // function to run once the uploaded file has been successfully ran
    const handleFileRead = () => {

        // define content to be a string of the file contents
        const content = fileReader.result;

        // numbers defining the start and end of the logic array for JSON parsing
        const logicSubstringStart = content.indexOf("[{");
        const logicSubstringEnd = content.indexOf("}]") + 2;
        
        // numbers defining the start and end of the settings object for JSON parsing
        const settingsSubstringStart = content.indexOf(">{") + 1;
        const settingsSubstringEnd = content.indexOf("}<") + 1;

        // set the states of logic and settings based off the substrings of the file
        // defined by the numbers above
        setLogic(JSON.parse(content.substring(logicSubstringStart, logicSubstringEnd)));
        setSettings(JSON.parse(content.substring(settingsSubstringStart, settingsSubstringEnd)));

       
    }

    // function ran on file upload. opens the file and sets handleFileRead to be
    // run on successful read
    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file)
    }


    // function ran after pressing the submit button. uses settings object and logic
    // array to update the relatative contexts
    const handleSubmit = (e) => {
        e.preventDefault();

        // array of true/false bools which correspond to if an item is acquired or not
        const startingItemBinaryArray = parseSettingsString(settings.CustomStartingItemListString);

        // iterates through the flag array and use ids from startingItemIdOrder to set
        // Acquired flags of corresponding items to the value of the particular flag
        startingItemBinaryArray.forEach((flag, index) => {

            // get corresponding item id from startingItemIdOrder
            const itemId = startingItemIdOrder[index];

            // get item from items context that holds itemId
            const item = items.find(item => item.ItemId === itemId);

            // set item acquired flag to correct starting bool
            item.Acquired = flag;
        });

        dispatchItems({type: 'SET_ITEMS', items});
    }


    // takes a string representing sets of 32-bit flags in form of hex seperated by "-"
    // returns an array of bools corresponding to the hex flags in acending id order
    const parseSettingsString = (string) => {

        // split the string by "-" and reverse the array of strings
        // generates string array of the hex flags 
        const sections = string.split("-").reverse();
        let parsedArray = [];

        // iterate through each string and generate corresponding bool values
        sections.forEach((section, index) => {
            let binaryString;

            // if the string is empty, it means no flag is set to "true"
            if(section.length === 0) {
                binaryString = "00000000000000000000000000000000";
            }

            // otherwise take the string and convert hex to binary
            else {
                binaryString = parseInt(section, 16).toString(2);
            }

            // small flag numbers can be missing flags. thus pad the front with
            // "false" bools (ie 0) so there are a total of 32 entries
            if(index !== sections.length - 1) {
                binaryString.padStart(32, 0);
            }

            // reverse iterate through a binary string. if charAt(i) = 1, then flag is
            // set to true. push the bool into the array that is returned
            for(let i = binaryString.length - 1; i >= 0; --i) {
                const binaryFlag = (binaryString.charAt(i) === '1') ? true : false;
                parsedArray.push(binaryFlag);
            }
        });
        
        return parsedArray;
    }

    // an input file form with a submit button
    return ( 
        <form onSubmit={e => handleSubmit(e)}>
            <input type="file" onChange={e => handleFileChosen(e.target.files[0])}/>
            <button type="submit">Upload File</button>
        </form>
     );
}
 
export default FileInput;