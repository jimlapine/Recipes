import { Recipe } from '../../shared/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as  RecipeActions from 'app/recipebook/ngRxStore/recipe.actions';
import * as fromApp from '../../ngRxStore/app.reducers';

// extends our AppState interface
export interface State {
  recipes: Recipe[]
}

// Create an intial state
const initialState: State = {
  recipes:  [
    new Recipe('Eggs',
      'Lovely amazing eggs..',
      'http://www.seriouseats.com/recipes/assets_c/2017/08/5708631471_06fed03518_o-thumb-1500xauto-438706.jpg',
      [
        new Ingredient('eggs', 3),
        new Ingredient('milk', .25),
        new Ingredient('pepper', .025),
        new Ingredient('salt', .05)
      ]),
    new Recipe('Hamburger',
      'Hamburger nuff said..',
      'http://images.media-allrecipes.com/userphotos/960x960/3757723.jpg',
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
export interface FeatureState extends fromApp.AppState {
  recipes: State
}

export function RecipeReducer( state = initialState, action: RecipeActions.RecipeActions ) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.id];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.id] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case RecipeActions.DELETE_RECIPE:
    {
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    }
    default:
    return state;
  }
}
