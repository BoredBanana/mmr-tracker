import React from 'react';
import Item from './Item';

class ItemList extends React.Component {
    generateItems() {
        const items = this.props.items;

        return items.map((item, key) => 
            <ul key={key}>
                <Item item={item} index={key} getItem={this.props.getItem}/>
            </ul>
        );
    }

    render() {
        return <div>
            {this.generateItems()}
        </div>
    }
}

export default ItemList;