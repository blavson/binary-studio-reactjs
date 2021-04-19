import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Basket extends Component {
    render() {
        const id = this.props.basket.id
        return (
            <Link to={`/baskets/${id}`}>
                <div className="basket">
                  <div className="basket-name"> { this.props.basket.name} </div>
                   <div className="basket-capacity"> { this.props.basket.capacity} </div>
              </div>
            </Link>
        );
    }
}

export default Basket;