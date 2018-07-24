import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import axios from 'axios';

class App extends Component {
 state = {
  };
  render() {
    return (
      <div>
         <Layout>
           <Switch>
            <Route path="/orders" component={Orders}/>
            <Route path="/" exact component = {BurgerBuilder}/>
            <Route path="/checkout" component = {Checkout}/>
           </Switch>
         </Layout>   
      </div>
    );
  }
}

export default App;
