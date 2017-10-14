import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/Ingredient.model';
import { ShoppingService } from '../../services/shopping.service';
// import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngRx/store';
import { Observable } from 'rxjs/Observable';
import * as fromShoppingList from '../ngRxStore/shopping-list.reducers';
import * as shoppingListActions from '../ngRxStore/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit  {

  // switched to observable for our state store
  // Ingredients: Ingredient[];
  // our observable resolves an and object with an ingreadiant property, which holds an Ingredients array
  // See the definition in the reducer shopping-list.reducers
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;
  // This property holds our subscription
  // IngredientsChangedSubscription: Subscription;

  // the store type conforms to the specification in app.module.ts: StoreModule.forRoot({ shoppinglist: shoppingListReducer })
  // our shoppingListReducer expects a list of Ingredients, which is passed as the 2nd JavaScript object
  constructor(private shoppingService: ShoppingService,
    private store: Store<fromShoppingList.AppState> ) {  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    /*
      Subscribe to our Ingredient changed event, whiich is used to update our
      local copy of the Ingredient list
    */
    // replaced by our observable, returned from our state store
    // this.IngredientsChangedSubscription = this.shoppingService.IngredientChanged.subscribe(
    //   (Ingredients:  Ingredient[]) => this.Ingredients = Ingredients
    // );
  }

  // ngOnDestroy() {
  //   // This is a custom observer, so we need to unsubscribe from it, angular does not clean these up for us.
  //   // this.IngredientsChangedSubscription.unsubscribe();
  // }

  OnEditItem(index: number) {
    // Use subject and emit an observable which is the index of the item we are editing
    // this.shoppingService.startedEditing.next(index);
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }
}
