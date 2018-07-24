import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
state={
	orders:[],
	loading:true
}
componentDidMount(){
	axios.get('/getOrders')
		.then(response => {
			this.setState({orders:response.data,loading:false});
		})
		.catch(error => {
			this.setState({loading:false});
		});
}
   render(){
   	  return(
         <div>
            {this.state.orders.map(order =>(
                <Order 
                   key={order.id}
                   ingredients={order.order}
                   price={order.price}
                />
             ))}
         </div>
   	  );
   }
}

export default withErrorHandler(Orders,axios);