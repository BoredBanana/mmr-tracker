import React from 'react';

class Region extends React.Component {
    
    
    render () {
        return (
            <td>
                {this.props.region.name}
            </td>
        );
    }
}


export default Region;