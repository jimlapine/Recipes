import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
// bundles exverything exprted from shopping-list.actions into one JavaScript object
import * as ShoppingListActions from '../ngRxStore/shopping-list.actions';
// Importing our interfaces from the shopping list reducers
import * as fromApp from '../../ngRxStore/app.reducers';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  // the store type conforms to the specification in app.module.ts: StoreModule.forRoot({ shoppinglist: shoppingListReducer })
  // our shoppingListReducer expects a list of Ingredients, which is passed as the 2nd JavaScript object
  constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
      this.subscription = this.store.select('shoppingList')
        .subscribe(
          data => {
            if (data.editedIngredientIndex > -1) {
              this.editedItem = data.editedIngredient;
              this.editMode = true;
              this.ingredientForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount
              })
            } else {
              this.editMode = false;
            }
          }
        );
    }

  ngOnDestroy() {
    // Clean up subscription, prevents memory leaks
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onSubmit() {
    // console.log(`IngredientForm: ${ this.IngredientForm.value}`);
    // console.log(`name: ${ this.IngredientForm.value.name } amount: ${ this.IngredientForm.value.amount }`);

    const name = this.ingredientForm.value.name;
    const amount = !isNaN(this.ingredientForm.value.amount) ? parseFloat(this.ingredientForm.value.amount) : 0;
    const ingredient = new Ingredient(name, amount);

    if (!this.editMode) {
      // dispatch our custom action AddIngredient, passing in our payload
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
      // this.shoppingService.addIngredient(ingredient);
    } else {
      // this.shoppingService.updateIngredient(this.editedItemIndex, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient: ingredient }))
      this.editMode = false;
    }

    this.ingredientForm.reset();
  }

  onClear() {
    this.ingredientForm.reset();
  }

  onDelete() {
    if (confirm('Are you sure that you want to delete this Ingredient?')) {
      // this.shoppingService.deleteIngredient(this.editedItemIndex);
      // dispatch our custom action AddIngredient, passing in our payload
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
      this.ingredientForm.reset();
      this.editMode = false;
    }
  }
}
