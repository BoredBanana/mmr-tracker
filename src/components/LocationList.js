import React from 'react';
import Region from './Region';
import Location from './Location';


import '../styles/LocationList.css';

class LocationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRegion: -1
        };
    }

    selectRegion(index) {
        this.setState({ selectedRegion: index });
    }

    setCheck(index) {
        let updatedOverworld = this.props.overworld;
        updatedOverworld[this.state.selectedRegion].locations[index].checked = !updatedOverworld[this.state.selectedRegion].locations[index].checked

        this.setState({ overworld: updatedOverworld });
    }

    getRegions() {
        let overworld = this.props.overworld;
        return overworld.map((region, key) =>
            <tr key = {key} onClick={() => this.selectRegion(key)}>
                <Region region = {region}/>
            </tr>
        );
    }

    getLocations() {
        const regionIndex = this.state.selectedRegion;
        const locations = this.props.overworld[regionIndex].locations;

        return locations.map((location, key) => 
            <tr className="location" key = {key} onClick = {() => this.setCheck(key)}>
                <Location location = {location} currentItems = {[]} />
            </tr>
        );
    }
    
    render () {
        const overworld = this.props.overworld;
        let contents;
        let header;

        if(this.state.selectedRegion === -1) {
            contents = this.getRegions();
            header = "Termina";
        }
        else {
            contents = this.getLocations();
            header = overworld[this.state.selectedRegion].name;
        }

        return (
            <div className="locationList">
                <div className="tableHeader">
                    {header}
                </div>

                <div className="tableBody">
                    <table>
                        <tbody>
                            {this.state.selectedRegion !== -1 &&
                                <tr className="non_location" onClick = {() => this.selectRegion(-1)}>
                                    <td>Termina</td>
                                </tr>
                            }
                            
                            {contents}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        );
    }

}

export default LocationList;