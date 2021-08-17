// import components and React
import React, { useState } from 'react';
import Location from './Location_new.js';

// import helper array of area names in Majora's Mask
import areas from '../util/areas.json';

// import relative styles
import '../styles/LocationList.css'

function LocationList(props) {

    // region will hold an int representing the position of the 
    // selected area to display in the imported array "areas"
    const [region, setRegion] = useState(null);

    // obtain table rows and values corresponding to areas in 
    // the imported array "areas". when an area is clicked, 
    // it is to be selected to display respective locations
    const getOverworldRegions = () => {
        return areas.map((area, index) => 
            <tr key={area.Name} onClick={() => setRegion(index)}>
                <td>
                    {area.Name}
                </td>
            </tr>
        );
    }

    let header;             // region name or "Termina" if no region
    let displayContents;    // the contents of the table rows

    // if no region is selected set header to "Termina" and 
    // obtain a series of table rows of the areas based on 
    // the imported "areas" array
    if(region === null) {
        displayContents = getOverworldRegions();
        header = "Termina";
    }

    // otherwise a region is selected and its respective Locations
    // should be displayed with the region name as the header
    else {
        header = areas[region].Name;
        
        let locationArray = areas[region].LocationIdInOrder;
        displayContents = locationArray.map( id => {
            return ( <Location key={id} id={id} /> );
        });
        
    }


    // build the location list table based on selected region and its
    // respective Locations. if there is a region selected, there should
    // be an option listed as "Termina" to go back to the region list
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