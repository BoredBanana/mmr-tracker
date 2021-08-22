import React from 'react';
import Item from './Item';

import itemOrder from '../util/Item Display Order.json';

const ItemList = () => {

    // function that generates an array of array of Item components
    // which takes the ids from the itemOrder array 
    const generateItemTable = () => {

        // array to be returned after Item arrays are generated
        let itemDisplayArray = [];

        // iterate through each itemId array
        itemOrder.forEach((itemArray, index) => {

            // push a <tr> element containing a row if Items to itemDisplayArray
            itemDisplayArray.push(
                <tr key={index}>
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