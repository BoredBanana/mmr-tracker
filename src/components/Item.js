import React, { useState, useEffect, useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext';

import "../styles/Item.css"

function Item(props) {
    const [image, setImage] = useState(null);
    const { items, dispatchItems } = useContext(ItemContext);

    const item = (typeof props.id === 'number') ? 
        items.find(item => item.ItemId === props.id) :
        {
            ItemId: null,
            ItemName: props.id,
            Acquired: true,
            IsFakeItem: true
        };

    useEffect(() => {
        import("../images/items/" + item.ItemName.replaceAll("Bottle: ", "") + ".png").then(image => {
            setImage(image.default);
        });
    });

    
    const handleClick = (e) => {
        const type = e.button === 0 ? 'CHECK' : 'UNCHECK';
        dispatchItems({ type, id: props.id })
    }

    return (
        <td onMouseDown={handleClick}>
            <img className={(item.Acquired) ? "acquired" : "not_acquired"} 
                 alt="" src={image} 
            />
        </td>
    )
}

export default Item;