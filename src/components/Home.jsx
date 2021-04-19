import { Component } from "react";
import M from 'materialize-css'
import axios from 'axios'
import BasketListHolder from "./BasketListHolder";

class Home extends Component {

    state = {
        basketName : '',
        capacity : 0,
        basketList : []
    }

    async componentDidMount() {
        M.AutoInit();
        const res = await axios.get('http://localhost:5000/baskets');
        if (res.data.success) {
            this.setState ({
                basketList : res.data.baskets
            });
        }
    }

    handleNameChange = (event)=> {
        this.setState({
            basketName :  event.target.value
        });
    }

    handleCapacityChange = (event)=> {
        this.setState({
            capacity : event.target.value
        })
    }


    createBasket = async (event) => {
        event.preventDefault();
        const res = await axios.post('http://localhost:5000/baskets', { 
                                                                            name : this.state.basketName,
                                                                            capacity :  this.state.capacity
                                                                     });      
                                                                              
         console.log(res.data)                                                                                                
    }


    render() {
        return (
            <div className="container">
                <div className="basket-management">

                    <button className="btn waves-effect waves-light modal-trigger brown lighten-3" href='#modal1' >Add Basket
                        <i className="material-icons">add_shopping_cart</i>
                    </button>
                </div>

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <form onSubmit={this.createBasket}>
                           <div className="row">
                               <div className="input-field col s6">
                                  <input placeholder="Basket name here" id="basket_name" type="text" className="validate"  onChange={this.handleNameChange }/>
                                  <label htmlFor="basket_name">Basket Name</label>
                                </div>
                               <div className="input-field col s3">
                                    <input id="capacity" type="text" className="validate" onChange={this.handleCapacityChange }/>
                                    <label htmlFor="capacity">Capacity</label>
                               </div>
                            <div className="modal-footer">
                             <input type="submit" className="modal-close waves-effect waves-green btn-flat" value="OK" />
                            </div>
                           </div>
                        </form>  
                     </div>
                 </div>

                 <div className="basket-list">
                     <h2>Some text here </h2>
                   <BasketListHolder baskets={this.state.basketList} />
                 </div>
         </div>
        );
    }
}


export default Home;