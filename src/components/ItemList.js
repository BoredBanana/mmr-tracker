import React, {useState} from 'react';
import Item from './Item';

import itemOrder from '../util/Item Display Order.json';

function ItemList(props) {
    const generateItemTable = () => {
        const items = generateItemArray();

        return items.map((row, key) => 
            <tr key={key}>
                {row.map((item, key) => 
                    <td key={key}>
                        <Item item={item} key={key} setItemAcquired={(id, acquired) => props.setItemAcquired(id, acquired)}/>
                    </td>
                )}
            </tr>
        );
    }

    const generateItemArray = () => {
        const itemArray = itemOrder.map(array => 
            array.map(itemId => {
                let item = props.items.find(item => itemId === item.ItemId);
                if(typeof item === 'undefined') {
                    item = {
                        "ItemId": null,
                        "ItemName": itemId,
                        "Acquired": true,
                        "IsFakeItem": true
                    }
                    
                }
                return item;
            })
        );
        return itemArray;
    }

    
    return (
        <div>
            <table>
                <tbody>
                    {generateItemTable()}
                </tbody>
            </table>
        </div>
    )
}

export default ItemList;