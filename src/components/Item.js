import React, {useState, useEffect} from 'react';

import "../styles/Item.css"

function Item(props) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        import("../images/items/" + props.item.ItemName.replaceAll("Bottle: ", "") + ".png").then(image => {
            setImage(image.default);
        });
    });

    const handleClickEvent = (click) => {
        props.setItemAcquired(props.item.ItemId, click.button === 0)
    }

    const acquiredClass = () => {
        return (props.item.Acquired) ? "acquired" : "not_acquired";
    }

    return (
        <img className={acquiredClass()} alt="image" src={image} onMouseDown={handleClickEvent}/>
    )
}

export default Item;