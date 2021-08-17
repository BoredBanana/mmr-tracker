import React, { createContext, useReducer } from 'react';
import { itemReducer } from '../reducers/itemReducer';
import itemFile from "../util/items.json";

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
    const [items, dispatchItems] = useReducer(itemReducer, itemFile);

    return (
        <ItemContext.Provider value={{ items, dispatchItems }}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemContextProvider;

