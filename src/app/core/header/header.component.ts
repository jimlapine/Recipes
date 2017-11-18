import { Component, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../ngRxStore/app.reducers';
import * as fromAuth from '../../auth/ngRxStore/auth.reducers';
import * as AuthActions from '../../auth/ngRxStore/auth.actions';
import * as RecipeActions from '../../recipebook/ngRxStore/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // property auth state, which is retrieved from the store
  authState: Observable<fromAuth.State>;
  constructor( private store: Store<fromApp.AppState> ) { }

  ngOnInit() {
    // get the auth state
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetch() {
    // this.dataStorageService.getRecipes();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.SignOut());
  }
}
