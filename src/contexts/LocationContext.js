// imports
import React, { createContext, useReducer } from 'react';
import { locationReducer } from '../reducers/locationReducer';
import locationFile from "../util/locations.json";

// generate the LocationContext
export const LocationContext = createContext();

// create a provider componenet that updates via a reducer
const LocationContextProvider = (props) => {
    const [locations, dispatchLocations] = useReducer(locationReducer, locationFile);


    return ( 
        <LocationContext.Provider value={{ locations, dispatchLocations }}>
            {props.children}
        </LocationContext.Provider>
     );
}
 
export default LocationContextProvider;