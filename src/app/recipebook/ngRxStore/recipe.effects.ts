import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromRecipe from './recipe.reducers';
import * as RecipeActions from './recipe.actions';
import { Recipe } from '../../shared/recipe.model';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-3e610.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map(
      (recipes) => {
        console.log(recipes);
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-3e610.firebaseio.com/recipes.json', state.recipes,
      { reportProgress: true});
       return this.httpClient.request(req);
    });

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) {}
}