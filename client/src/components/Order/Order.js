import React from 'react';
import classes from './Order.css';

const order = (props) =>{
    let ingredients = [
      {
      	name:'salad',
      	amount:props.salad
      },
      {
      	name:'bacon',
      	amount:props.bacon
      },
      {
      	name:'cheese',
      	amount:props.cheese
      },
      {
      	name:'meat',
      	amount:props.meat
      }
    ];
    console.log(ingredients);
    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={ig.name}> {ig.name} ({ig.amount})</span>;
    });
	return(
		<div className={classes.Order}>
		<p>Ingredients: {ingredientOutput}</p>
		 <p>Price: <strong>{props.price} INR</strong></p>
		</div>
		);
}

export default order;