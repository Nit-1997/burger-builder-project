import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
	salad:20,
	bacon:50,
	cheese:20,
	meat:50
}

const initialState ={
	ingredients:{
		salad:0,
		bacon:0,
		meat:0,
		cheese:0
	},
	totalPrice:30,
};

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
    default:
    return state;
}
};

export default reducer;