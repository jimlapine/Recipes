import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/Ingredient.model';
import { ShoppingService } from '../../services/shopping.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngRx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy  {

  // switched to observable for our state store
  // Ingredients: Ingredient[];
  // our observable resolves an and object with an ingreadiant property, which holds an Ingredients array
  // See the definition in the reducer shopping-list.reducers
  shoppingListState: Observable<{Ingredients: Ingredient[]}>;
  // This property holds our subscription
  IngredientsChangedSubscription: Subscription;

  // the store type conforms to the specification in app.module.ts: StoreModule.forRoot({ shoppinglist: shoppingListReducer })
  // our shoppingListReducer expects a list of Ingredients, which is passed as the 2nd JavaScript object
  constructor(private shoppingService: ShoppingService,
    private store: Store<{ shoppinglist: { Ingredients: Ingredient[] } }> ) {  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppinglist');
    /*
      Subscribe to our Ingredient changed event, whiich is used to update our
      local copy of the Ingredient list
    */
    // replaced by our observable, returned from our state store
    // this.IngredientsChangedSubscription = this.shoppingService.IngredientChanged.subscribe(
    //   (Ingredients:  Ingredient[]) => this.Ingredients = Ingredients
    // );
  }

  ngOnDestroy() {
    // This is a custom observer, so we need to unsubscribe from it, angular does not clean these up for us.
    // this.IngredientsChangedSubscription.unsubscribe();
  }

  OnEditItem(index: number) {
    // Use subject and emit an observable which is the index of the item we are editing
    this.shoppingService.startedEditing.next(index);
  }
}
