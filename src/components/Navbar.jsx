import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
           <div className="container">
            <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo">Logo</Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/baskets" >Baskets </Link></li>
              </ul>
            </div>
          </nav>
          </div> 
        );
    }
}

export default Navbar;