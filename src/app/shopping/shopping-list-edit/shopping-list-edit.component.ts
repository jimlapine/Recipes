import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('IngredientForm') IngredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    // Subscribe to our startedEditing subject, which will contain the index of what we are editing
    this.subscription = this.shoppingService.startedEditing
      .subscribe(
        (index: number) => {
          // Switch to edit mode and store the item we are editting
          this.editMode = true;
          this.editedItemIndex = index;
          // Grab the edited item from the shopping service
          this.editedItem = this.shoppingService.getIngredient(index);
          // Assign the edited values to our form
          this.IngredientForm.setValue({name: this.editedItem.name, amount: this.editedItem.amount});
        }
      );
  }

  ngOnDestroy() {
    // Clean up subscription, prevents memory leaks
    this.subscription.unsubscribe();
  }

  onSubmit() {
    // console.log(`IngredientForm: ${ this.IngredientForm.value}`);
    // console.log(`name: ${ this.IngredientForm.value.name } amount: ${ this.IngredientForm.value.amount }`);

    const name = this.IngredientForm.value.name;
    const amount = !isNaN(this.IngredientForm.value.amount) ? parseFloat(this.IngredientForm.value.amount) : 0;
    const ingredient = new Ingredient(name, amount);

    if (!this.editMode) {
      this.shoppingService.addIngredient(ingredient);
    } else {
      this.shoppingService.updateIngredient(this.editedItemIndex, ingredient);
      this.editMode = false;
    }

    this.IngredientForm.reset();
  }

  onClear() {
    this.IngredientForm.reset();
  }

  onDelete() {
    if (confirm('Are you sure that you want to delete this Ingredient?')) {
      this.shoppingService.deleteIngredient(this.editedItemIndex);
      this.IngredientForm.reset();
      this.editMode = false;
    }
  }
}
