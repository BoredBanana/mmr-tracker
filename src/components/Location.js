import React from 'react';

import '../styles/Location.css'

class Location extends React.Component {    
    getAvailability() {
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
    
    
    render () {
        const location = this.props.location;
        const availability = this.getAvailability();

        return (
            <td className={availability}>
                {location.name}
            </td>
        );
    }
}

export default Location;
