import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
// Action Type
export const ADD_Ingredient = 'ADD_Ingredient';

// creating our our action, since by default actions only contain types,
// ours now contains a payload as well
export class AddIngredient implements Action {
  // assign the action type for this action AddIngredient
  readonly type = ADD_Ingredient;
  // Add our custom property which will be a payload containing an Ingredient
  // payload: Ingredient;

  // Added payload to constuctor to allow it to be easily passed in
  constructor(public payload: Ingredient) { }
}

// export the type(s) we are supporting
export type ShoppingListActions = AddIngredient;
