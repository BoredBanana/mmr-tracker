// react and context imports
import React, { useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext';
import { LocationContext } from '../contexts/LocationContext';

const Location = (props) => {

    // get the location and item contexts. Locations do not update items but
    // require knowledge of what has been acquired
    const { locations, dispatchLocations } = useContext(LocationContext);
    const { items } = useContext(ItemContext);

    // get the location object relating to the props.id passed into the component
    const location = locations.find(loc => loc.LocationId === props.id);

    // iterate through an array of IDs and check if every ID relates to an item 
    // with the Acquired attribute set to true. done by searching items array
    // for the relative item and returning item.Acquired. array.every stops
    // if false is returned in the function
    const hasRequiredItems = (itemArray) => {
        return itemArray.every(id => {
            let item = items.find(item => item.ItemId === id);
            return item.Acquired;
        });
    }

    // assess the requirements and conditionals of the location object and compares them with
    // the items array to determine if the location is accessible
    const checkAvailability = () => {

        // if the location is already checked, mark it as so
        if(location.Checked) {
            return "completed";
        }

        // check if every required item is acquired by using the hasRequiredItems function above
        let requirementsSatisfied = hasRequiredItems(location.RequiredItemIds);

        // iterate through the conditionals array and check if there is an array for which all the 
        // relavent item ids are acquired. fundamentally works as "any of these sets of requirements"
        // alternatively if conditionals has no entries then they are satisfied
        let conditionalsSatisfied = location.ConditionalItemIds.length === 0 ||
            location.ConditionalItemIds.some(conditionalArray => hasRequiredItems(conditionalArray));
        
        // a locations availability is true if the two above bools are true
        let availability = requirementsSatisfied && conditionalsSatisfied;

        return (availability) ? "available" : "unavailable";
    }

    // when a location is clicked, update the context with whether the
    // location is marked or unmarked based on the used mouse button
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