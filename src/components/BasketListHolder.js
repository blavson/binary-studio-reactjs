import React, { Component } from 'react';
import Basket from './Basket'

class BasketListHolder extends Component {

    render() {
        const basketmap = this.props.baskets.map((b, idx) => {
            return ( 
                <Basket key={idx} basket={b} />
            )
        })

        return (
            <div>
                BasketHolder
                {basketmap}
            </div>
        );
    }
}

export default BasketListHolder;