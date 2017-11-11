import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../ngRxStore/app.reducers';
import * as fromAuth from '../../auth/ngRxStore/auth.reducers';
import { Observable } from 'rxjs/Observable';
import * as AuthActions from '../../auth/ngRxStore/auth.actions';
import { DataStorageService } from '../../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // property auth state, which is retrieved from the store
  authState: Observable<fromAuth.State>;
  constructor(private dataStorageService: DataStorageService, private store: Store<fromApp.AppState> ) { }

  ngOnInit() {
    // get the auth state
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.dataStorageService.storeRecipes();
  }

  onFetch() {
    this.dataStorageService.getRecipes();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.SignOut());
  }
}
