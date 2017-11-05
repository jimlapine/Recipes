import { Recipe } from '../../shared/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

export interface State {
  recipes: Recipe[]
}

// Create an intial state
const initialState: State = {
  recipes:  [
    new Recipe('Eggs',
      'Lovely amazing eggs..',
      'https://tinyurl.com/h4sscp3',
      [
        new Ingredient('eggs', 3),
        new Ingredient('milk', .25),
        new Ingredient('pepper', .025),
        new Ingredient('salt', .05)
      ]),
    new Recipe('Hamburger',
      'Hamburger nuff said..',
      'https://tinyurl.com/y92qe5bs',
      [
        new Ingredient('bun', 1),
        new Ingredient('ground beef', .25),
        new Ingredient('lettuce', .25),
        new Ingredient('tomato', .25),
        new Ingredient('pickle', .5),
        new Ingredient('onion', .25),
        new Ingredient('pepper', .025),
        new Ingredient('salt', .05)
      ])
  ]
};

// interface for this feature Recipe
export interface FeatureState {
  recipes: State
}

export function RecipeReducer( state = initialState, action ) {

}
