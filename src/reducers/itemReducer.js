export const itemReducer = (state, action) => {
    let clickedItem = state.find(item => item.ItemId === action.id);
    switch(action.type) {
        case 'CHECK':
            clickedItem.Acquired = true;
            break;
        case 'UNCHECK':
            clickedItem.Acquired = false;
            break;
        default:
            console.log('Action Type ' + action.type + ' does not exist in itemReducer');
    }

    return state.map((item) => {
        if(item.IsFakeItem) {
            let requirementsSatisfied = !item.hasOwnProperty('RequiredItemIds') || hasRequiredItems(item.RequiredItemIds, state);
            let conditionalsSatisfied = !item.hasOwnProperty('ConditionalItemIds') || item.ConditionalItemIds.length === 0 ||
                item.ConditionalItemIds.some(conditionalArray => hasRequiredItems(conditionalArray, state));
            
            item.Acquired = requirementsSatisfied && conditionalsSatisfied;
        }

        return item;
    });
}


const hasRequiredItems = (itemIdArray, itemArray) => {
    return itemIdArray.every(id => {
        let item = itemArray.find(item => item.ItemId === id);
        return item.Acquired;
    });
}
