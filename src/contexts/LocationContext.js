import React, { createContext, useReducer } from 'react';
import { locationReducer } from '../reducers/locationReducer';
import locationFile from "../util/locations.json";

export const LocationContext = createContext();

const LocationContextProvider = (props) => {
    const [locations, dispatchLocations] = useReducer(locationReducer, locationFile);


    return ( 
        <LocationContext.Provider value={{ locations, dispatchLocations }}>
            {props.children}
        </LocationContext.Provider>
     );
}
 
export default LocationContextProvider;