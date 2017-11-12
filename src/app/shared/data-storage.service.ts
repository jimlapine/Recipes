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
import * as recipeActons from '../recipebook/ngRxStore/recipe.actions';
import { Observable } from 'rxjs/Observable';
import * as fromRecipe from 'app/recipebook/ngRxStore/recipe.reducers';
@Injectable()
export class DataStorageService {
  recipeState: Observable<fromRecipe.State>;
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromRecipe.FeatureState>) {
  }

  storeRecipes() {
    this.store.select('recipes')
    .take(1)
    .subscribe(
      (recipeState: fromRecipe.State) => {
        recipeState.recipes.forEach(element => {
          console.log(`Recipe:  ${ element.name }`);
        });
        return this.httpClient.put('https://ng-recipe-book-3e610.firebaseio.com/recipes.json', recipeState.recipes).subscribe();
      }
    );
  }

  getRecipes() {
    // we can tell the get request what type of data we are expecting back, no need to use Response.json()
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-3e610.firebaseio.com/recipes.json')
      .map(
        (recipes) => {
          // console.log(`getRecipes: ${ recipes } `);
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
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new recipeActons.SetRecipes(recipes));
        }
      );
  }
}
