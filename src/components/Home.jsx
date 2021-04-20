import { Component } from "react";
import M from 'materialize-css'
import axios from 'axios'
import BasketListHolder from "./BasketListHolder";
import './style.css'

class Home extends Component {

    state = {
        basketName : '',
        capacity : 0,
        basketList : []
    }

    fetchBaskets = async() => {
        const res = await axios.get('http://localhost:5000/baskets');
        if (res.data.success) {
            this.setState ({
                basketList : res.data.baskets
            });
        }
    }
    async componentDidMount() {
        M.AutoInit();
        this.fetchBaskets()

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


    async  componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("prevState", prevState)
        console.log("this.state", this.state)
        if ( ( this.state.basketName !== '' ) && ( parseInt(this.state.capacity) !== 0) ) 
            this.fetchBaskets()
         
    
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

                    <button className="btn waves-effect waves-light modal-trigger blue darken-2" href='#modal1' >Add Basket
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
                                <button  id="cancelButton" className="btn modal-close waves-effect blue lighten-3" >Cancel</button>
                                <input type="submit" className="btn modal-close waves-effect blue lighten-1" value="Add" />
                              </div>
                           </div>
                        </form>  
                       </div>
                     </div>

                 <div className="basket-list">
                     <h2>Basket List</h2>
                    <BasketListHolder baskets={this.state.basketList} />
                 </div>
         </div>
        );
    }
}


export default Home;