import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
// Action Types
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
// creating our our action, since by default actions only contain types,
// ours now contains a payload as well
export class AddIngredient implements Action {
  // assign the action type for this action AddIngredient
  readonly type = ADD_INGREDIENT;
  // Add our custom property which will be a payload containing an Ingredient
  // payload: Ingredient;

  // Added payload to constuctor to allow it to be easily passed in
  constructor(public payload: Ingredient) { }
}

export class AddIngredients implements Action {
  // assign the action type for this action AddIngredient
  readonly type = ADD_INGREDIENTS;
  // Add our custom property which will be a payload containing an Ingredient
  // payload: Ingredient[];

  // Added payload to constuctor to allow it to be easily passed in
  constructor(public payload: Ingredient[]) { }
}

// export the type(s) we are supporting
// | is the union operator
export type ShoppingListActions = AddIngredient | AddIngredients;

