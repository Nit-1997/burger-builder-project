import React from 'react';
import classes from './Order.css';

const order = (props) =>(
  <div className={classes.Order}>
     <p><strong>ORDER DETAILS</strong><br/>{props.ingredients}</p><strong>{props.price} INR</strong>
  </div>
);

export default order;