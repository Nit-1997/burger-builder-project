import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component{
  state = {
     purchasing:false
   }

 componentDidMount(){
   console.log(this.props);
   this.props.onInitIngredients();
 }

 updatePurchasable = (ingredients) =>{

  const sum = Object.keys(ingredients)
  .map(igKey =>{
    return ingredients[igKey];
  })
  .reduce((sum,el)=>{
   return sum+el;
 },0);
  return sum>0;       
}

purchaseHandler = () =>{
 this.setState({purchasing:true});
}

purchaseCancelHandler = () =>{
  this.setState({purchasing:false});
}

purchaseContinueHandler = () =>{
this.props.history.push('/checkout');
}


render(){
 const disabledInfo ={
  ...this.props.ings
};
for(let key in disabledInfo){
  disabledInfo[key] = disabledInfo[key]<=0
}

let orderSummary = null;

let burger = this.props.error ? <p>ingredients cant be loaded</p> : <Spinner/>;

if(this.props.ings){
  burger = (
    <Aux>
    <Burger ingredients = {this.props.ings}/>
    <BuildControls 
    ingredientAdded = {this.props.onIngredientAdded}
    ingredientRemove = {this.props.onIngredientRemoved}
    disabled = {disabledInfo}
    price={this.props.totalPrice}
    purchasable = {this.updatePurchasable(this.props.ings)}
    ordered = {this.purchaseHandler}
    />
    </Aux>
    );
  orderSummary = <OrderSummary 
  ingredients={this.props.ings}
  purchaseCanceled={this.purchaseCancelHandler}
  purchaseContinued ={this.purchaseContinueHandler}
  price={this.props.totalPrice}
  />;
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

const mapStateToProps = state =>{
  return{
    ings:state.ingredients,
    totalPrice:state.totalPrice,
    error:state.error
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onIngredientAdded:(ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved:(ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients:() => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));