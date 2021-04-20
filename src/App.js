import {BrowserRouter as Router, Route } from 'react-router-dom'
import BasketPage from './components/BasketPage'
import Home from './components/Home'
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/baskets" component={Home} />
      <Route  exact path="/baskets/:basket_id" component={BasketPage} />

    </Router>
  )
}

export default App;
