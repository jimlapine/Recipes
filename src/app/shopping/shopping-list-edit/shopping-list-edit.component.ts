import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingrediant } from '../../shared/ingrediant.model';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingrediantForm') ingrediantForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingrediant;

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
          this.editedItem = this.shoppingService.getIngrediant(index);
          // Assign the edited values to our form
          this.ingrediantForm.setValue({name: this.editedItem.name, amount: this.editedItem.amount});
        }
      );
  }

  ngOnDestroy() {
    // Clean up subscription, prevents memory leaks
    this.subscription.unsubscribe();
  }

  onSubmit() {
    // console.log(`ingrediantForm: ${ this.ingrediantForm.value}`);
    // console.log(`name: ${ this.ingrediantForm.value.name } amount: ${ this.ingrediantForm.value.amount }`);

    const name = this.ingrediantForm.value.name;
    const amount = !isNaN(this.ingrediantForm.value.amount) ? parseFloat(this.ingrediantForm.value.amount) : 0;
    const ingrediant = new Ingrediant(name, amount);

    if (!this.editMode) {
      this.shoppingService.addIngrediant(ingrediant);
    } else {
      this.shoppingService.updateIngrediant(this.editedItemIndex, ingrediant);
      this.editMode = false;
    }

    this.ingrediantForm.reset();
  }

  onClear() {
    this.ingrediantForm.reset();
  }

  onDelete() {
    if (confirm('Are you sure that you want to delete this ingrediant?')) {
      this.shoppingService.deleteIngrediant(this.editedItemIndex);
      this.ingrediantForm.reset();
      this.editMode = false;
    }
  }
}
