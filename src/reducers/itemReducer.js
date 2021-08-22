// reducer that updates the state of items. can set items to acquired
// or unacquired as well as set the whole items array to a new array
// if item acquired is set, run a function to assess the state of 
// fake item acquired attributes
export const itemReducer = (state, action) => {
    let clickedItem = state.find(item => item.ItemId === action.id);
    switch(action.type) {
        case 'CHECK':
            clickedItem.Acquired = true;
            break;
        case 'UNCHECK':
            clickedItem.Acquired = false;
            break;
        case 'SET_ITEMS':
            return [...action.items];
        default:
            console.log('Action Type ' + action.type + ' does not exist in itemReducer');
    }

    // newItemArray returns an array with updated item attributes
    return newItemArray(state);
}

// iterates through a given array of items and updates item.Acquired of fake items
// if any item.Acquired is going to change, recalculate the array at the end
// this is required as some fake items often require other fake items that occur
// in the later array that may be updated
const newItemArray = (array) => {

    // define new items array and bool to track if array needs recalculating
    let items = [];
    let recalculate = false;

    // iterate through provided array
    array.forEach(item => {

        // only fake items need updating
        if(item.IsFakeItem) {

            // calculate if the items requirements and conditionals are satisfied using the
            // hasRequiredItems function. check Location.js for more information
            let requirementsSatisfied = !item.hasOwnProperty('RequiredItemIds') || hasRequiredItems(item.RequiredItemIds, array);
            let conditionalsSatisfied = !item.hasOwnProperty('ConditionalItemIds') || item.ConditionalItemIds.length === 0 ||
                item.ConditionalItemIds.some(conditionalArray => hasRequiredItems(conditionalArray, array));
            
            const result = requirementsSatisfied && conditionalsSatisfied;
            
            // if item.Acquired is going to change, array needs to be recalculated
            recalculate = recalculate || result !== item.Acquired;

            item.Acquired = result;
        }

        items.push(item);
    });

    // if recalculate is true, rerun the function using the new generated item array
    return (recalculate) ? newItemArray(items) : items;
}

// iterate the item id array and check if the provided array of items
// has the required items set to Acquired
const hasRequiredItems = (itemIdArray, itemArray) => {
    return itemIdArray.every(id => {
        let item = itemArray.find(item => item.ItemId === id);
        return item.Acquired;
    });
}
