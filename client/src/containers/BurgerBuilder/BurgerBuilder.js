import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
 salad:20,
 bacon:50,
 cheese:20,
 meat:50
}

class BurgerBuilder extends Component{
  constructor(props){
   super(props);
   this.state = {
     ingredients:null,
     totalPrice:30,
     purchasable:false,
     purchasing:false,
     error:false,
     loading:false
   }
 }

 componentDidMount(){
  axios.get('/getIngredients')
   .then(response => {
    let ingredients = response.data[0];
    console.log(ingredients);
    this.setState({ingredients:ingredients},()=>{
      console.log(this.state.ingredients);
    });
  })
   .catch(error => {
    this.setState({error:true});
  });
 }

 updatePurchasable = (ingredients) =>{

  const sum = Object.keys(ingredients)
  .map(igKey =>{
    return ingredients[igKey];
  })
  .reduce((sum,el)=>{
   return sum+el;
 },0);
  this.setState({purchasable:sum>0});        
}

purchaseHandler = () =>{
 this.setState({purchasing:true});
}

addIngredientHandler = (type) =>{
 const oldCount = this.state.ingredients[type];
 const updatedCount = oldCount +1;
 const updatedIngredients = {
   ...this.state.ingredients
 };
 updatedIngredients[type] = updatedCount;
 const priceAddition = INGREDIENT_PRICES[type];
 const oldPrice = this.state.totalPrice;
 const newPrice = oldPrice+priceAddition;
 this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
 this.updatePurchasable(updatedIngredients);
}

removeIngredientHandler = (type) =>{
 const oldCount = this.state.ingredients[type];
 if(oldCount<=0){
  return;
}
const updatedCount = oldCount -1;
const updatedIngredients = {
 ...this.state.ingredients
};
updatedIngredients[type] = updatedCount;
const priceDeduction = INGREDIENT_PRICES[type];
const oldPrice = this.state.totalPrice;
const newPrice = oldPrice-priceDeduction;
this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
this.updatePurchasable(updatedIngredients);
}

purchaseCancelHandler = () =>{
  this.setState({purchasing:false});
}

purchaseContinueHandler = () =>{
const queryParams = [];
for(let i in this.state.ingredients){
   queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
}
queryParams.push('price='+this.state.totalPrice);

const queryString = queryParams.join('&')
this.props.history.push({
  pathname:'/checkout',
  search:'?'+queryString
});
}


render(){
 const disabledInfo ={
  ...this.state.ingredients
};
for(let key in disabledInfo){
  disabledInfo[key] = disabledInfo[key]<=0
}

let orderSummary = null;

let burger = this.state.error ? <p>ingredients cant be loaded</p> : <Spinner/>;

if(this.state.ingredients){
  burger = (
    <Aux>
    <Burger ingredients = {this.state.ingredients}/>
    <BuildControls 
    ingredientAdded = {this.addIngredientHandler}
    ingredientRemove = {this.removeIngredientHandler}
    disabled = {disabledInfo}
    price={this.state.totalPrice}
    purchasable = {this.state.purchasable}
    ordered = {this.purchaseHandler}
    />
    </Aux>
    );
  orderSummary = <OrderSummary 
  ingredients={this.state.ingredients}
  purchaseCanceled={this.purchaseCancelHandler}
  purchaseContinued ={this.purchaseContinueHandler}
  price={this.state.totalPrice}
  />;
}

if(this.state.loading){
 orderSummary = <Spinner/>;
} 

return (
 <Aux>
 <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
 {orderSummary}
 </Modal>
 {burger}
 </Aux>   
 );
}
}

export default withErrorHandler(BurgerBuilder,axios);