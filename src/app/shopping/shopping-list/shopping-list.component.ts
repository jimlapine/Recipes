import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/Ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromShoppingList from '../ngRxStore/shopping-list.reducers';
import * as ShoppingListActions from '../ngRxStore/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
