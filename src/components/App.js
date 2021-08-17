// imports
import React from 'react';
import LocationList from './LocationList.js';
// import ItemList from './ItemList';

// contexts
import ItemContextProvider from '../contexts/ItemContext.js';
import LocationContextProvider from '../contexts/LocationContext.js';

// styles
import '../styles/App.css';


const App = () => {
    return (
        <div onContextMenu={(e) => e.preventDefault()}>
            <LocationContextProvider>
                <ItemContextProvider>
                        <div className="locationTable">
                            <LocationList/>
                        </div>
                        {/* <div className="itemTable">
                            <ItemList items={items} setItemAcquired={(id, acquired) => setItemAcquired(id, acquired)}/>
                        </div>  */}
                </ItemContextProvider>
            </LocationContextProvider>
        </div>
      );
}

export default App; 