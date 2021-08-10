// imports
import React, {useState} from 'react';
import LocationList from './LocationList.js';
import ItemList from './ItemList';

// json files
import locationFile from '../util/locations.json';
import itemFile from "../util/items.json";

// styles
import '../styles/App.css';

function App() {
    const [items, setItems] = useState(itemFile);

    const [locations, setLocations] = useState(locationFile);

    const setItemAcquired = (id, acquired) => {
        if(id !== null) {
            let updatedItems = [...items];
            updatedItems.find(item => id === item.ItemId).Acquired = acquired;

            updatedItems.forEach(item => {
                if(item.IsFakeItem) {
                    item.Acquired = checkRequirements(item);
                }
            })

            setItems(updatedItems);
        }
    }

    const checkRequirements = (item) => {
        let requirementsSatisfied = hasRequiredItems(item.RequiredItemIds);
        let conditionalsSatisfied = item.ConditionalItemIds.length === 0 ||
            item.ConditionalItemIds.some(conditionalArray => hasRequiredItems(conditionalArray));
        
        return requirementsSatisfied && conditionalsSatisfied;
    }

    const findItem = (itemId) => {
        return items.find(item => item.ItemId === itemId);
    }

    const hasRequiredItems = (itemArray) => {
        return itemArray.every(itemId => findItem(itemId).Acquired);
    }

    const setLocationChecked = (id, checked) => {
        let updatedLocations = [...locations];
        updatedLocations.find(location => location.LocationId === id).Checked = checked
        setLocations(updatedLocations);
    }

    return (
        <div onContextMenu={(e) => e.preventDefault()}>
            <div className="locationTable">
                <LocationList locations={locations} items={items} setLocationChecked={(id, checked) => setLocationChecked(id, checked)}/>
            </div>
            <div className="itemTable">
                <ItemList items={items} setItemAcquired={(id, acquired) => setItemAcquired(id, acquired)}/>
            </div> 
        </div>

      );
}

export default App; 