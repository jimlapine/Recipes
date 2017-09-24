import { Recipe } from '../shared/recipe.model';
import { Ingrediant } from '../shared/ingrediant.model';
import { Injectable } from '@angular/core';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs/Subject';
// import { Headers } from '@angular/http';
// Imports the new HTTP Client for angular
import { HttpClient } from '@angular/common/http';
// allows us to use map
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../auth/auth.service';
@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Eggs',
      'Lovely amazing eggs..',
      'https://tinyurl.com/h4sscp3',
      [
        new Ingrediant('eggs', 3),
        new Ingrediant('milk', .25),
        new Ingrediant('pepper', .025),
        new Ingrediant('salt', .05)
      ]),
    new Recipe('Hamburger',
      'Hamburger nuff said..',
      'https://tinyurl.com/y92qe5bs',
      [
        new Ingrediant('bun', 1),
        new Ingrediant('ground beef', .25),
        new Ingrediant('lettuce', .25),
        new Ingrediant('tomato', .25),
        new Ingrediant('pickle', .5),
        new Ingrediant('onion', .25),
        new Ingrediant('pepper', .025),
        new Ingrediant('salt', .05)
      ])
  ];

  // Inject shopping service
  constructor(private shoppingService: ShoppingService,
    private authService: AuthentificationService, private http: HttpClient) { }

  getRecipes() {
    // Returns a copy of the recipe list
    return this.recipes.slice();
  }

  // Add Ingrediants using injected shopping service
  addIngrediantsToShoppingList(ingrediants: Ingrediant[]) {
    // I added ingrediants in a for loop
    // ingrediants.forEach(element => {
    //   this.shoppingService.AddIngrediant(element);
    // });
    this.shoppingService.addIngrediants(ingrediants);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  onSave() {
    // post appends records to existing list
    // first argument is url we are posting to
    // this command creates an observable be does not send the request
    // no request will be sent until it has a subscriber.
    // data.json is firebase specifc, data can be any name you choose
    // We can also set custom headers if needed, json is the default, and this is shown as an example
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // return this.http.post('https://ng-http-38096.firebaseio.com/data.json',
    //   servers, {headers: headers});
    const token = this.authService.getToken();
    // using put will overrwrite data
    return this.http.put('https://ng-recipe-book-3e610.firebaseio.com/recipes.json?auth=' + token,
      this.recipes);
  }

  private fetch() {
    // this alllow us to transform our data in a centralized location
    // map will allow us to manipulate our response, return data and wrap in new observable
    const token = this.authService.getToken();

    if (token !== null && token !== undefined) {
      return this.http.get<Recipe[]>('https://ng-recipe-book-3e610.firebaseio.com/recipes.json?auth=' + token)
        .map(
        (recipes) => {
          // const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            // if we don't have an igreidants array add an empty one
            if (!recipe['ingrediants']) {
              // console.log(recipe);
              recipe['ingrediants'] = [];
            }
          }
          return recipes;
        }
        )
        .subscribe(
        (recipes: Recipe[]) => {
          if (recipes != null) {
            this.recipes = recipes;
            this.recipesChanged.next(this.recipes.slice());
          } else {
            this.recipesChanged.next(this.recipes.slice());
          }
        },
        (error) => {
          console.log(error);
        }
        );
    } else {
      return new Promise<Recipe[]>(null);
    }
  }

  onFetch() {
    this.fetch();
  }
}
