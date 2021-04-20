import React, { Component } from 'react';

class Fruit extends Component {
    render() {
        return (
           <div className="col s3"> 
            <div className="fruit-item">
                <div className="friut-name center">{this.props.fruit.name}</div>
                <div className="fruit-weight center">{this.props.fruit.weight }</div>
            </div>
            </div>  
        );
    }
}

export default Fruit;