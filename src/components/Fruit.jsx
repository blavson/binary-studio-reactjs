import React, { Component } from 'react';
import axios from 'axios'
import M from 'materialize-css'

class Fruit extends Component {

    deleteFruit =async ()=> {
        const res = await  axios.delete(`http://localhost:5000/fruits/${this.props.fruit.id}`);
        console.log(res)
        if (res.data.success === true) {
            M.toast({html: "Fruit deleted successfully", classes : 'indigo accent-1'})
        } else {
            M.toast({html: "Can't delete fruit", classes : 'pink darken-2'})
        }

    }
    render() {
        return (
           <div className="col s3"> 
            
             <div className="row">
                <div className="col s5"> 
                    <div className="fruit-item">
                        <div className="friut-name center">{this.props.fruit.name}</div>
                        <div className="fruit-weight center">{this.props.fruit.weight }</div>
                    </div>   
                </div> 
                <div className="col s1"> 
                   <span className="delete-icon" > <i className="small material-icons" onClick={this.deleteFruit}>delete</i> </span>
                </div>   
             </div>  
            
          </div>  
        );
    }
}

export default Fruit;