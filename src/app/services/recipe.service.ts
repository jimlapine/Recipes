import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs/Subject';
// Imports the new HTTP Client for angular
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
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
  ];

  // Inject shopping service
  constructor(private shoppingService: ShoppingService,
    private authService: AuthentificationService, private http: HttpClient) { }

  getRecipes() {
    // Returns a copy of the recipe list
    return this.recipes.slice();
  }

  // Add Ingredients using injected shopping service
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // I added Ingredients in a for loop
    // Ingredients.forEach(element => {
    //   this.shoppingService.AddIngredient(element);
    // });
    this.shoppingService.addIngredients(ingredients);
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
    // also we can appead more HttpHeaders options by using the .Append
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // const token = this.authService.getToken();
    // We can query parameters using the new HttpClient and the HttpParams option
    // also we can appead more HttpParams options by using the .Append
    // const params = new HttpParams().set('auth', token);
    // return this.http.post('https://ng-http-38096.firebaseio.com/data.json',
    //   servers, {headers: headers});
    // using put will overrwrite data
    // return this.http.put('https://ng-recipe-book-3e610.firebaseio.com/recipes.json',
    //   this.recipes, {
    //     observe: 'body',
    //     headers: headers,
    //     params: params
    //   });
    // creating a request using a HttpRequest parameters: Type, URL, Data, Options
    // reportProgress reports on the progress of our request, useful for tracking the progress of a request
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-3e610.firebaseio.com/recipes.json', this.recipes,
      { reportProgress: true});
    return this.http.request(req);
  }

  private fetch() {
      // We can tell the HttpClient was type we are expecting back
      return this.http.get<Recipe[]>('https://ng-recipe-book-3e610.firebaseio.com/recipes.json')
        .map(
        (recipes) => {
          // We no longer need to parse the repsonse, the HttpClient knows what type we are getting back and handles it
          // const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            // if we don't have an igreidants array add an empty one
            if (!recipe['ingredients']) {
              // console.log(recipe);
              recipe['ingredients'] = [];
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
  }

  onFetch() {
    this.fetch();
  }
}
