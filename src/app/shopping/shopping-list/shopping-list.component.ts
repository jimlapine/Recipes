import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingrediant } from '../../shared/ingrediant.model';
import { ShoppingService } from '../../services/shopping.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy  {

  ingrediants: Ingrediant[];
  // This property holds our subscription
  ingrediantsChangedSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) {  }

  ngOnInit() {
    this.ingrediants = this.shoppingService.getIngrediants();
    /*
      Subscribe to our ingrediant changed event, whiich is used to update our
      local copy of the ingrediant list
    */
    this.ingrediantsChangedSubscription = this.shoppingService.ingrediantChanged.subscribe(
      (ingrediants:  Ingrediant[]) => this.ingrediants = ingrediants
    );
  }

  ngOnDestroy() {
    // This is a custom observer, so we need to unsubscribe from it, angular does not clean these up for us.
    this.ingrediantsChangedSubscription.unsubscribe();
  }

  OnEditItem(index: number) {
    // Use subject and emit an observable which is the index of the item we are editing
    this.shoppingService.startedEditing.next(index);
  }
}
