// bundles exverything exprted from shopping-list.actions into one JavaScript object
import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

// Create intial state, since it is null at first
const initialIngredients: Ingredient[] = [
  new Ingredient('Apples', 5),
  new Ingredient('Tomatoes', 10),
];
const intialState = {
  ingredients: initialIngredients,
}

// we set an intial state which by default is an empty array and use our own action which includes a payload
export function shoppingListReducer(state = intialState, action: ShoppingListActions.ShoppingListActions) {
  // action types are strings
  switch (action.type) {
    // we stored the action type string in the ShoppingListActions.ADD_Ingredient constant
    case ShoppingListActions.ADD_Ingredient:
      // we return the state and the list of ingrients, using the es6 spread operator
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}
