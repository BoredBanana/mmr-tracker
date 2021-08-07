import React, {useState} from 'react';

function Item(props) {
    
    const handleClickEvent = (click) => {
        props.setItemAcquired(props.item.ItemId, click.button === 0)
    }

    return (
        <p onMouseDown={handleClickEvent}>
            {props.item.ItemName} - {String(props.item.Acquired)}
        </p>
    )
}

export default Item;