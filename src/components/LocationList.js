import React, {useState} from 'react';

import areas from '../util/areas.json';

import '../styles/Location.css'

function LocationList(props) {

    const [region, setRegion] = useState(null);

    const getOverworldLocations = () => {
        return areas.map((currentRegion, key) => 
            <tr key = {key} onClick = {() => setRegion(key)}>
                <td>
                    {currentRegion.Name}
                </td>
            </tr>
        );
    }

    const getRegionLocations = () => {
        let locations = [];

        areas[region].LocationIdInOrder.forEach(id => {
            locations.push(props.locations.find(element => id === element.LocationId))
        });

        return locations.map((location, key) => 
        <tr className="location" key={key} onMouseDown={(e) => props.setLocationChecked(location.LocationId, e.button === 0)}>
            <td className={checkAvailability(location)}>
                {location.LocationName}
            </td>
        </tr>
        );
    }

    const checkAvailability = (location) => {
        if(location.Checked) {
            return "completed";
        }

        let availability = location.RequiredItemIds.length === 0 || 
                           location.RequiredItemIds.every(id => props.items.find(element => id === element.ItemId).Acquired);
        
        availability = (availability && location.ConditionalItemIds.length === 0)  || 
                       location.ConditionalItemIds.some(conditionals => 
                            conditionals.every(id => props.items.find(element => id === element.ItemId).Acquired)); 
            
        if(location.LocationName === "Postbox") {
            console.log(availability);
        }
        

        return (availability) ? "available" : "unavailable"
    }


    let header;
    let displayContents;
    if(region === null) {
        displayContents = getOverworldLocations();
        header = "Termina";
    }
    else {
        displayContents = getRegionLocations();
        header = areas[region].Name;
    }

    return (
        <div className="locationList">
            <div className="tableHeader">
                {header}
            </div>

            <div className="tableBody">
                <table>
                    <tbody>
                        {region !== null &&
                            <tr className="non_location" onClick = {() => setRegion(null)}>
                                <td>Termina</td>
                            </tr>
                        }
                        
                        {displayContents}
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
}

export default LocationList;