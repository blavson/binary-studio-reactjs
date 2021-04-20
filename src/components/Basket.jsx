import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'


class Basket extends Component {

    deleteBasket = async() => {
            const res = await  axios.delete(`http://localhost:5000/baskets/${this.props.basket.id}`);
            console.log(res)
            if (res.data.success === true) {
                M.toast({html: "Basket deleted successfully", classes : 'indigo accent-1'})
            } else {
                M.toast({html: "Can't delete Basket", classes : 'pink darken-2'})
        }
    }

    render() {
        const id = this.props.basket.id
        return (
            <>
            <Link to={`/baskets/${id}`}>
                <div className="basket">
                  <div className="basket-name"> { this.props.basket.name} </div>
                   <div className="basket-capacity"> { this.props.basket.capacity} </div>
              </div>
            </Link>
                  <div id="delete-basket"><i className="small material-icons" onClick={this.deleteBasket}>delete</i> </div>
          </>        
        );
    }
}

export default Basket;