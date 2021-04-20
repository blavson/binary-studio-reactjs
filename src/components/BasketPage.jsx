import axios from 'axios';
import React, { Component } from 'react';
import './style.css'
import M from 'materialize-css'
import FruitListHolder from './FruitListHolder';


class BasketPage extends Component {

    state = {
        basket : {},
        new_name : '',
        weight : 0,
        fruitName : '',
        aggrWeight : 0
    }

    fetchFruits = async () => {
        const id = this.props.match.params.basket_id
        const resp = await axios.get(`http://localhost:5000/baskets/${id}`)
        if (resp.data.success) 
          this.setState({
              basket : resp.data.basket[0]
          })
        }

    componentDidMount = async() =>  {
        M.AutoInit();
        this.fetchFruits()

    }

    getAggrWeight = () => {
        const basket = this.state.basket
        console.log(this.state.basket)
        let totalWeight = 0
        if (basket.fruits.length !== 0) {
            basket.fruits.forEach(fruit => {
              totalWeight += fruit.weight
             })
        }
        return totalWeight
    }

    addFruit = async() => {
      const currentWeight = this.state.weight
      let totalWeight = this.getAggrWeight()

      console.log(totalWeight, currentWeight, this.state.basket.capacity)  
      if ( parseInt(currentWeight) + parseInt(totalWeight) < parseInt(this.state.basket.capacity) ) {
          const basket_id = this.state.basket.id
          const uri = `http://localhost:5000/baskets/${basket_id}`
          const res = await axios.post(uri, {  basket_id : basket_id ,
                                               weight : this.state.weight,
                                               name : this.state.fruitName   
                                  })
          if (res.data.success) {
              this.setState ({
                  weight : 0,
                  name :''
              })                        
        }
    }
}

async  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("prevState", prevState)
    console.log("this.state", this.state)
    if ( ( this.state.fruitName !== '' ) && ( parseInt(this.state.weight) !== 0) ) 
         this.fetchFruits()

}

    handleRadioButton = (event) => {
        const tag = parseInt(event.target.value)
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


    render (){
        let snippet = '';
        let avg = 0    
        if (this.state.basket.fruits !== undefined) {
            snippet =( <FruitListHolder fruits={this.state.basket.fruits} /> ) 
            avg = this.getAggrWeight()
        }
        return (
            <div className="container">     
                  <div className="row">
                    <div className="input-field col s6 offset-s3">
                       <input id="basket_input_name" type="text" className="validate" onChange={this.handleName}/>
                        <label htmlFor="basket_input_name">{this.state.basket.name}</label>
                     </div>
                  </div>

                  <div className="row">
                  <div className="col s6 offset-s3">  
                    <button  className="btn-large waves-effect blue lighten-1" id="updateButton" onClick={this.updateData}>Update</button>
                 </div>
                </div>

                {/* <h3>{this.getAggrWeight()} / {this.state.capacity}</h3> */}

                <h2 className="basket-ratio center"> {avg} / {this.state.basket.capacity}</h2>
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
                {snippet}

                <div className="row">
                    <div className="input-field col s6 offset-s3 center">
                        <button className="btn-large waves-effect waves-light modal-trigger  pink lighten-2" id="addItemButton" href='#modal2' >Add Fruit Item
                            <i className="material-icons">add</i>
                         </button>
                    </div>
                </div>
           </div>
        );
    }
}

export default BasketPage;