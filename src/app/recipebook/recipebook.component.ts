import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../ngRxStore/app.reducers';
import * as fromAuth from '../auth/ngRxStore/auth.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipebook',
  templateUrl: './recipebook.component.html',
  styleUrls: ['./recipebook.component.css'],
})

export class RecipebookComponent implements OnInit {
  // property auth state, which is retrieved from the store
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState> ) { }

  ngOnInit() {
      // get the auth state
      this.authState = this.store.select('auth');
  }

}
