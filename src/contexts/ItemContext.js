// imports
import React, { createContext, useReducer } from 'react';
import { itemReducer } from '../reducers/itemReducer';
import itemFile from "../util/items.json";

// create ItemContext
export const ItemContext = createContext();

// generate a context provider which updates via a reducer
const ItemContextProvider = (props) => {
    const [items, dispatchItems] = useReducer(itemReducer, itemFile);

    return (
        <ItemContext.Provider value={{ items, dispatchItems }}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemContextProvider;

