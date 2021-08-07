import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
    }

    updateItem() {
        const progress = this.state.progress;
        const obtained = this.state.obtained;
        const item = this.props.item;
        const index = this.props.index;
        
        if(!item.obtained) {
            console.log(index);
            this.props.getItem(index);
        }


        // if(Array.isArray(item.progressive) && progress < item.progressive.length - 1) {
        //     console.log("obtained " + item.progressive[progress]);
        //     this.setState({progress: progress + 1});
        // }
        // else if(!item.obtained && !obtained) {
        //     console.log("obtained " + item.name);
        //     this.setState({obtained: true});
        // }
    }

    render() {
        const progress = this.state.progress;
        const item = this.props.item;
        const name = item.progressive === false ? item.name : item.progressive[progress];

        return <p onClick={this.updateItem.bind(this)} >
            {name} - {item.obtained.toString()}
        </p>
    }


}

export default Item;