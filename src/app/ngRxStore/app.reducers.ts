import * as fromShoppingList from '../shopping/ngRxStore/shopping-list.reducers';
import * as fromAuth from '../auth/ngRxStore/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';
// Set up application wide interface for state, which contains the shopping list state and the Auth state
export interface AppState {
  shoppingList: fromShoppingList.State
  auth: fromAuth.State;
}

// Export a reducer map for use in the app.module.ts
export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
}
