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
  private Ingredients: Ingredient[] = [];

  getIngredients() {
    return this.Ingredients.slice();
  }

  getIngredient(index: number) {
    return this.Ingredients[index];
  }

  addIngredient(Ingredient: Ingredient) {
      this.Ingredients.push(Ingredient);
      this.IngredientChanged.next(this.Ingredients.slice());
  }

  updateIngredient(index: number, Ingredient: Ingredient) {
    // Update Ingredient
    this.Ingredients[index] = Ingredient;
    // Emit our new Ingredient list
    this.IngredientChanged.next(this.Ingredients.slice());
  }

  deleteIngredient(index: number) {
    // Update Ingredient
    this.Ingredients.splice(index, 1);
    // Emit our new Ingredient list
    this.IngredientChanged.next(this.Ingredients.slice());
  }

  addIngredients(Ingredients: Ingredient[]) {
    // ... ES 6 feature, spread operator, separates the array into individual item
    // this.Ingredients.push(...Ingredients);

    // Sort our incomming list
    Ingredients.sort(this.compare);

    // Ignore dups
    if (this.Ingredients.length === 0) {
      this.Ingredients.push(...Ingredients);
    } else {
      Ingredients.forEach(element => {
        if (this.Ingredients.findIndex(item => item.name === element.name) < 0) {
          this.Ingredients.push(element);
        }
      });
    }

    // Sort our outlist
    this.Ingredients.sort(this.compare);

    this.IngredientChanged.next(this.Ingredients.slice());
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
