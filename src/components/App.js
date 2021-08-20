// imports
import React from 'react';
import LocationList from './LocationList.js';
import ItemList from './ItemList';
import FileInput from './FileInput.js';

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
                    <FileInput />
                    <div className="locationTable">
                        <LocationList/>
                    </div>
                    <div className="itemTable">
                        <ItemList />
                    </div>
                </ItemContextProvider>
            </LocationContextProvider>
        </div>
      );
}

export default App; 