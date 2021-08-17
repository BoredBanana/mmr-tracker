import React, { useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext';
import { LocationContext } from '../contexts/LocationContext';

import '../styles/Location.css';


const Location = (props) => {

    const { locations, dispatchLocations } = useContext(LocationContext);
    const { items } = useContext(ItemContext);

    const location = locations.find(loc => loc.LocationId === props.id);

    const hasRequiredItems = (itemArray) => {
        return itemArray.every(id => {
            let item = items.find(item => item.ItemId === id);
            return item.Acquired;
        });
    }

    const checkAvailability = () => {
        if(location.Checked) {
            return "completed";
        }

        let requirementsSatisfied = hasRequiredItems(location.RequiredItemIds);
        let conditionalsSatisfied = location.ConditionalItemIds.length === 0 ||
            location.ConditionalItemIds.some(conditionalArray => hasRequiredItems(conditionalArray));
        
        let availability = requirementsSatisfied && conditionalsSatisfied;

        if(availability) {
            return "available";
        }
        else {
            return "unavailable"
        }
    }

    const handleClick = (e) => {
        const type = e.button === 0 ? 'CHECK' : 'UNCHECK'
        dispatchLocations({ type, id: props.id })
    }

    return ( 
        <tr className="location" onMouseDown={handleClick}>
            <td className={checkAvailability()}>
                {location.LocationName}
            </td>
        </tr>
     );
}
 
export default Location;