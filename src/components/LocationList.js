import React, {useState} from 'react';
import Location from './Location.js';

import areas from '../util/areas.json';

import '../styles/Location.css'

function LocationList(props) {

    const [region, setRegion] = useState(null);

    const findLocation = (locationId) => {
        return props.locations.find(location => location.LocationId === locationId);
    }

    const getOverworldRegions = () => {
        return areas.map((area, key) => 
            <tr key={key} onClick={() => setRegion(key)}>
                <td>
                    {area.Name}
                </td>
            </tr>
        );
    }

    const getRegionLocations = (locationIdArray) => {
        let locations = locationIdArray.map(locationId => findLocation(locationId));

        return locations.map((location, key) => {
            return (<tr className="location" key={key} 
                onMouseDown={e => props.setLocationChecked(location.LocationId, e.button === 0)}>

                <Location location={location} items={props.items}/>

            </tr>
        )})
    }

    let header;
    let displayContents;
    if(region === null) {
        displayContents = getOverworldRegions();
        header = "Termina";
    }
    else {
        displayContents = getRegionLocations(areas[region].LocationIdInOrder);
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