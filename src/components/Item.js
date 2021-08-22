// import react and item contexts
import React, { useState, useEffect, useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext';

function Item(props) {
    
    // state of an image needed as otherwise re-render will not occur when image is found
    // item context is used for getting the item associated with item id from props.id
    const [image, setImage] = useState(null);
    const { items, dispatchItems } = useContext(ItemContext);

    // if props.id is a number than it relates to a specific itemId in the item list
    // otherwise it is a string representing an item set to always acquired
    const item = (typeof props.id === 'number') ? 
        items.find(item => item.ItemId === props.id) :
        {
            ItemId: null,
            ItemName: props.id,
            Acquired: true,
            IsFakeItem: true
        };

    // when item.ItemName is updated, get the image relating to it and save it to image state. items
    // with ":" are invalid. these are all proceeded with "Bottle" so remove that from the image name
    useEffect(() => {
        import("../images/items/" + item.ItemName.replaceAll("Bottle: ", "") + ".png").then(image => {
            setImage(image.default);
        });
    }, ([item.ItemName]));


    // function used when item is clicked and updates the context with a type which is
    // dependent on which mouse button is clicked
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