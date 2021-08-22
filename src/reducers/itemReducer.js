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

    return newItemArray(state);
}

const newItemArray = (array) => {
    let items = [];
    let recalculate = false;
    array.forEach(item => {
        if(item.IsFakeItem) {
            let requirementsSatisfied = !item.hasOwnProperty('RequiredItemIds') || hasRequiredItems(item.RequiredItemIds, array);
            let conditionalsSatisfied = !item.hasOwnProperty('ConditionalItemIds') || item.ConditionalItemIds.length === 0 ||
                item.ConditionalItemIds.some(conditionalArray => hasRequiredItems(conditionalArray, array));
            
            if(!recalculate && requirementsSatisfied && conditionalsSatisfied && !item.Acquired) {
                recalculate = true;
            }

            item.Acquired = requirementsSatisfied && conditionalsSatisfied;
        }

        items.push(item);
    });

    return (recalculate) ? newItemArray(items) : items;
}

const hasRequiredItems = (itemIdArray, itemArray) => {
    return itemIdArray.every(id => {
        let item = itemArray.find(item => item.ItemId === id);
        return item.Acquired;
    });
}
