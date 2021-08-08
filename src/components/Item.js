import React, {useState, useEffect} from 'react';

function Item(props) {
    const [image, setImage] = useState(null);
    useEffect(() => {
            setImage(require("../images/items/" + props.item.ItemName + ".png"));
    }, [props.item]);

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