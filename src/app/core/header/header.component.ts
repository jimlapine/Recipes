import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AuthentificationService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../ngRxStore/app.reducers';
import * as fromAuth from '../../auth/ngRxStore/auth.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // property auth state, which is retrieved from the store
  authState: Observable<fromAuth.State>;
  constructor(private recipeService: RecipeService, public authService: AuthentificationService,
  private store: Store<fromApp.AppState> ) { }

  ngOnInit() {
    // get the auth state
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.recipeService.onSave().subscribe(
      (response) => {
        // console.log(response);
      },
      (error) => {
        // console.log(error);
      }
    );
  }

  onFetch() {
    this.recipeService.onFetch();
  }

  onLogOut() {
    this.authService.signOut();
  }
}
