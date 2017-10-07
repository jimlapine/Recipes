import { Ingredient } from '../shared/Ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingService {
  /*
    Create an event emitter to inform other components that data has changed
    We do this, because our components have a copy of the Ingredient array
    not the original
  */

  // Subject is both an observable and Observer
  IngredientChanged = new Subject<Ingredient[]>();
  // Introducting Reducers, requires install of another package: @ngrx/store
  // npm install --save @ngrx/store
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];

  // getIngredients() {
  //   return this.Ingredients.slice();
  // }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  // addIngredient(Ingredient: Ingredient) {
  //     this.Ingredients.push(Ingredient);
  //     this.IngredientChanged.next(this.Ingredients.slice());
  // }

  updateIngredient(index: number, Ingredient: Ingredient) {
    // Update Ingredient
    this.ingredients[index] = Ingredient;
    // Emit our new Ingredient list
    this.IngredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    // Update Ingredient
    this.ingredients.splice(index, 1);
    // Emit our new Ingredient list
    this.IngredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // ... ES 6 feature, spread operator, separates the array into individual item
    // this.Ingredients.push(...Ingredients);

    // Sort our incomming list
    ingredients.sort(this.compare);

    // Ignore dups
    if (this.ingredients.length === 0) {
      this.ingredients.push(...ingredients);
    } else {
      ingredients.forEach(element => {
        if (this.ingredients.findIndex(item => item.name === element.name) < 0) {
          this.ingredients.push(element);
        }
      });
    }

    // Sort our outlist
    this.ingredients.sort(this.compare);

    this.IngredientChanged.next(this.ingredients.slice());
  }

  compare(a: Ingredient, b: Ingredient) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 0;
    }
  }
}
