import * as actionTypes from '../actions/actionTypes';

const initialState ={
    ingredients:null,
    totalPrice:30,
    error:false
};

const INGREDIENT_PRICES = {
	salad:20,
	bacon:50,
	cheese:20,
	meat:50
}

const reducer = (state = initialState,action)=>{
	switch(action.type){
		case actionTypes.ADD_INGREDIENT:
		return{
			...state,
			ingredients:{
				...state.ingredients,
            //new es6 syntax for adding updating an obj
            [action.ingredientName]:state.ingredients[action.ingredientName]+1
        },
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    case actionTypes.REMOVE_INGREDIENT:
    return{
    	...state,
    	ingredients:{
    		...state.ingredients,
            //new es6 syntax for adding updating an obj
            [action.ingredientName]:state.ingredients[action.ingredientName]-1
        },
        totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
    case actionTypes.SET_INGREDIENTS:
    return{
    	...state,
    	ingredients:{ 
    		salad: action.ingredients.salad,
    		bacon: action.ingredients.bacon,
    		cheese: action.ingredients.cheese,
    		meat: action.ingredients.meat
    	},
    	error:false
    };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
    return{
    	...state,
    	error:true
    };
    default:
    return state;
}
};

export default reducer;