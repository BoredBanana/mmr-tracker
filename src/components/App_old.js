// components
import React from 'react';
import LocationList from './LocationList.js';
import ItemList from './ItemList';

// json files
import overworld from '../util/locations.json';
import items from "../util/items.json";

// styles
import '../styles/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: items,
            overworld: overworld
        }

        this.getItem = this.getItem.bind(this);
    }

    getItem(index) {
        console.log("clicking " + index);
        let updatedItems = this.state.items;
        updatedItems[index].obtained = true;
        this.setState({items: updatedItems});
    }

    render() {
        const overworld = this.state.overworld;
        const items = this.state.items;

        return (
          <div>
              <div className="locationTable">
                  <LocationList overworld={overworld} items={items}/>
              </div>
              <div className="itemTable">
                  <ItemList items={items} getItem={this.getItem}/>
              </div>
          </div>

        );
    }
}

export default App;
