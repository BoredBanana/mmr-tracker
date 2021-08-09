import React from 'react';

import '../styles/Location.css';

function Location(props) {

    const findItem = (itemId) => {
        return props.items.find(item => item.ItemId === itemId);
    }

    const hasRequiredItems = (itemArray) => {
        return itemArray.every(itemId => findItem(itemId).Acquired);
    }

    const checkAvailability = () => {
        if(props.location.Checked){
            return "completed";
        }

        let requirementsSatisfied = hasRequiredItems(props.location.RequiredItemIds);
        let conditionalsSatisfied = props.location.ConditionalItemIds.length === 0 ||
            props.location.ConditionalItemIds.some(conditionalArray => hasRequiredItems(conditionalArray));
        
        let availability = requirementsSatisfied && conditionalsSatisfied;

        if(availability) {
            return "available";
        }
        else {
            return "unavailable"
        }
    }

    return (
        <td className={checkAvailability()}>
            {props.location.LocationName}
        </td>
    );
}

export default Location;