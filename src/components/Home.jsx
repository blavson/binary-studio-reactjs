import { Component } from "react";
import M from 'materialize-css'
import axios from 'axios'

class Home extends Component {

    state = {
        basketName : '',
        capacity : 0
    }

    componentDidMount() {
        M.AutoInit();
    }

    handleNameChange = (event)=> {
        this.setState({
            basketName :  event.target.valule
        });
    }

    handleCapacityChange = (event)=> {
        this.setState({
            capacity : event.target.value
        })
    }


    createBasket = () => {

    }


    render() {
        return (
            <div className="container">
                <div className="basket-management">

                    <button className="btn waves-effect waves-light modal-trigger green darken-2" href='#modal1' >Add Basket
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
                            </div>     
                        </form>  
                    </div>                         
                    <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">OK</a>
                    </div>
                </div>
                    
            </div>
        );
    }
}


export default Home;