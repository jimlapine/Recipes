import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import the new angular Http Client
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../ngRxStore/app.reducers';
import * as AuthActions from '../auth/ngRxStore/auth.actions';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {
  }

  storeRecipes() {
    return this.httpClient.put('https://ng-recipe-book-3e610.firebaseio.com/recipes.json?auth=', this.recipeService.getRecipes());
  }

  getRecipes() {
    // we can tell the get request what type of data we are expecting back, no need to use Response.json()
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-3e610.firebaseio.com/recipes.json?auth=')
      .map(
        (recipes) => {
          // const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
