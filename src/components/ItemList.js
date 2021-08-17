import React from 'react';
import Item from './Item';

import itemOrder from '../util/Item Display Order.json';

const ItemList = () => {

    const generateItemTable = () => {
        let itemDisplayArray = [];
        let index = 0;
        itemOrder.forEach(itemArray => {
            itemDisplayArray.push(
                <tr key={index++}>
                    { 
                        itemArray.map(id => {
                            return ( <Item key={id} id={id} /> ); 
                        })
                    }
                </tr>
            );
        });

        return itemDisplayArray;
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