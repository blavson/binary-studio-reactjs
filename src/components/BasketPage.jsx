import axios from 'axios';
import React, { Component } from 'react';
import './style.css'
import M from 'materialize-css'


class BasketPage extends Component {

    state = {
        basket : {},
        new_name : '',
        weight : 0,
        fruitName : ''
    }

    componentDidMount = async() =>  {
        M.AutoInit();
        const basketId = this.props.match.params.id
        const resp = await axios.get(`http://localhost:5000/baskets/${basketId}`)
        console.log(resp)
        if (resp.data.success) 
          this.setState({
              basket : resp.data.basket[0]
          })

    }

    addFruit = async() => {
      const basket = this.state.basket
      const currentWeight = this.state.weight
      let totalWeight = 0
      if (basket.fruits.length !== 0) {
          basket.fruits.forEach(fruit => {
            totalWeight += fruit.weight
      })
    }
      console.log(totalWeight, currentWeight, this.state.basket.capacity)  
      if (currentWeight + totalWeight < this.state.basket.capacity) {
          const id = this.state.basket.id
          const uri = `http://localhost:5000/baskets/${id}`
          console.log(uri)
          const res = await axios.post(uri, {  basket_id : id,
                                               weight : this.state.weight,
                                               name : this.state.fruitName   
                                  })
       
        }
}

    handleRadioButton = (event) => {
        const tag = event.target.value
        if (tag === 1)
          this.setState({
                fruitName : 'Apple'
          })
       else if (tag === 2)    
           this.setState({
           fruitName : 'Orange'
          })
       else
          this.setState({
          fruitName : 'Watermelon'
          })     
    }

    handleName = (event) => {
        this.setState ({
            new_name : event.target.value
        });
    }

    handleWeight = (event) => {
        this.setState({
                weight : event.target.value
        })
    }


    render() {
        return (
            <div className="container">     
              <div className="basket_properties">
                  <div className="row">
                    <div className="input-field col s6 offset-s3">
                       <input id="basket_input_name" type="text" className="validate" onChange={this.handleName}/>
                        <label htmlFor="basket_input_name">{this.state.basket.name}</label>
                     </div>
                  </div>
              </div>

                <div className="row">
                    <div className="col s6 offset-s3 center">
                        <button className="btn waves-effect waves-light modal-trigger  pink lighten-2" href='#modal2' >Add Item
                            <i className="material-icons">add</i>
                         </button>
                    </div>
                </div>

               <div id="modal2" className="modal">
                    <div className="modal-content">
                      <div className="row">    
                        <div className="col s4">
                        <p>
                            <label>
                                        <input className="with-gap" name="fruits" type="radio" value="1"  onChange={this.handleRadioButton} />
                                        <span>Apple</span>
                             </label>
                           </p>           
                        </div> 
                         <div className="col s4">
                         <p>
                            <label>
                                    <input  className="with-gap" name="fruits" type="radio" value="2"  onChange={this.handleRadioButton}  />
                                    <span>Orange</span>
                             </label>
                         </p>     
                        </div>
                        <div className="col s4"> 
                        <p>
                            <label>
                                    <input  className="with-gap" name="fruits" type="radio" value="3" onChange={this.handleRadioButton} />
                                    <span>Watermelon</span>
                            </label>
                         </p>           
                        </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4 offset-s4">
                                <input  type="text"  onChange={this.handleWeight} />
                                <label htmlFor="weight">Weight</label>
                            </div>
                         </div>   
                      </div>
                    <div className="modal-footer">
                        <button  id="cancelButton" className="btn modal-close waves-effect pink lighten-3" >Cancel</button>
                        <button  className="btn modal-close waves-effect pink lighten-1" onClick={this.addFruit}>Add</button>
                    </div>

               </div>
           </div>
        );
    }
}

export default BasketPage;