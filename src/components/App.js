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
            setItems(updatedItems);
        }
    }

    const setLocationChecked = (id, event) => {
        let updatedLocations = [...locations];
        updatedLocations[id].Checked = event.button === 1
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