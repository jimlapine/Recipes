import { Recipe } from '../shared/recipe.model';
import { Ingrediant } from '../shared/ingrediant.model';
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
    // also we can appead more HttpHeaders options by using the .Append
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const token = this.authService.getToken();
    // We can query parameters using the new HttpClient and the HttpParams option
    // also we can appead more HttpParams options by using the .Append
    const params = new HttpParams().set('auth', token);
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
      { reportProgress: true, params: params });
    return this.http.request(req);
  }

  private fetch() {
    // this alllow us to transform our data in a centralized location
    // map will allow us to manipulate our response, return data and wrap in new observable
    const token = this.authService.getToken();

    if (token !== null && token !== undefined) {
      // We can tell the HttpClient was type we are expecting back
      return this.http.get<Recipe[]>('https://ng-recipe-book-3e610.firebaseio.com/recipes.json?auth=' + token)
        .map(
        (recipes) => {
          // We no longer need to parse the repsonse, the HttpClient knows what type we are getting back and handles it
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
