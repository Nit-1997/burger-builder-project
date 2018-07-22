import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button'; 
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
	state ={
		name:'',
		email:'',
		address:{
			street:'',
			postalcode:''
		},
		loading:false
	}
	orderHandler = (event) =>{
		event.preventDefault();
		this.setState({loading:true});
		const order = {
			ingredients:this.props.ingredients,
			price:this.props.price,
			customer:{
				name:'Nitin Bhat',
				address:{
					street:'21st cross',
					zipCode:'570006',
					country:'India',
					state:'Karnataka',
					region:'Mysore'
				},
				email:'ntnbhat9@gmail.com'
			}
		}
		axios.post('/create',order)
		.then(response => {
			this.setState({loading:false});
			this.props.history.push('/');
		})
		.catch(error => {
			this.setState({loading:false});
		});
	}
	render(){
		let form =(
			<form>
			<input className={classes.Input} type='text' name='name' placeholder='your name'/>
			<input className={classes.Input} type='email' name='email' placeholder='your email'/>
			<input className={classes.Input} type='text' name='street' placeholder='your street'/>
			<input className={classes.Input} type='text' name='postal' placeholder='postal code'/>
			<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
			</form>
			);
		if(this.state.loading){
			form = <Spinner/>;
		}
		return(
			<div className={classes.ContactData}>
			<h4>Enter your Contact Data</h4>
			{form}
			</div>
			)
	}
}

export default ContactData;