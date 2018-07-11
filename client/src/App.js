import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import axios from 'axios';

class App extends Component {
 state = {
    response: ''
  };

  componentDidMount() {
  	axios.get( '/api/hello' )
            .then( response => {
                 console.log(response,'from backend');
                //this.setState({});
            } )
            .catch(error => {
                 console.log(error);
            });
  }
  render() {
    return (
      <div>
         <Layout>
            <BurgerBuilder/>
         </Layout>   
      </div>
    );
  }
}

export default App;
