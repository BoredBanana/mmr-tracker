import React, {useState} from 'react';
import Item from './Item';

function ItemList(props) {
    const generateItems = () => {
        const items = props.items;

        return items.map((item, key) => 
            <ul key={key}>
                <Item item={item} key={key} setItemAcquired={(id, acquired) => props.setItemAcquired(id, acquired)}/>
            </ul>
        );
    }

    
    return (
        <div>
            {generateItems()}
        </div>
    )
}

export default ItemList;