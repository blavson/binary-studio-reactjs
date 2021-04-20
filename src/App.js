import {BrowserRouter as Router, Route } from 'react-router-dom'
import BasketPage from './components/BasketPage'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route  path="/baskets/:basket_id" component={BasketPage} />

    </Router>
  )
}

export default App;
