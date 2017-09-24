import { Ingrediant } from '../shared/ingrediant.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingService {
  /*
    Create an event emitter to inform other components that data has changed
    We do this, because our components have a copy of the ingrediant array
    not the original
  */

  // Subject is both an observable and Observer
  ingrediantChanged = new Subject<Ingrediant[]>();
  startedEditing = new Subject<number>();
  private ingrediants: Ingrediant[] = [];

  getIngrediants() {
    return this.ingrediants.slice();
  }

  getIngrediant(index: number) {
    return this.ingrediants[index];
  }

  addIngrediant(ingrediant: Ingrediant) {
      this.ingrediants.push(ingrediant);
      this.ingrediantChanged.next(this.ingrediants.slice());
  }

  updateIngrediant(index: number, ingrediant: Ingrediant) {
    // Update Ingrediant
    this.ingrediants[index] = ingrediant;
    // Emit our new ingrediant list
    this.ingrediantChanged.next(this.ingrediants.slice());
  }

  deleteIngrediant(index: number) {
    // Update Ingrediant
    this.ingrediants.splice(index, 1);
    // Emit our new ingrediant list
    this.ingrediantChanged.next(this.ingrediants.slice());
  }

  addIngrediants(ingrediants: Ingrediant[]) {
    // ... ES 6 feature, spread operator, separates the array into individual item
    // this.ingrediants.push(...ingrediants);

    // Sort our incomming list
    ingrediants.sort(this.compare);

    // Ignore dups
    if (this.ingrediants.length === 0) {
      this.ingrediants.push(...ingrediants);
    } else {
      ingrediants.forEach(element => {
        if (this.ingrediants.findIndex(item => item.name === element.name) < 0) {
          this.ingrediants.push(element);
        }
      });
    }

    // Sort our outlist
    this.ingrediants.sort(this.compare);

    this.ingrediantChanged.next(this.ingrediants.slice());
  }

  compare(a: Ingrediant, b: Ingrediant) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 0;
    }
  }
}
