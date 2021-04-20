import React, { Component } from 'react';
import Fruit from './Fruit'

class FruitListHolder extends Component {
    render() {
        const fruitmap = this.props.fruits.map((f, idx) => {
            return ( 
                <Fruit key={idx} fruit={f} />
            )
        })
        return (
            <div className="row">
                {fruitmap}
            </div>
        );
    }
}

export default FruitListHolder;