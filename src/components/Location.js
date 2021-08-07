import React from 'react';

import '../styles/Location.css'

function Location() {    
    const getAvailability = () => {
        const currentItems = this.props.currentItems;
        const checked = this.props.location.checked;
        const requirements = this.props.location.requirements;
        const conditionals = this.props.location.conditionals;

        let availability = requirements[0] === undefined && conditionals[0] === undefined;

        for(let item of requirements) {
            if(!currentItems.includes(item)) {
                availability = false;
                break;
            }
            availability = true;
        }

        if(checked) {
            return "completed";
        }
        else if(availability) {
            return "available";
        }
        else {
            return "unavailable"
        }

    }
    

    return (
        <td className={availability}>
            {props.location.LocationName}
        </td>
    );
}

export default Location;
