import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../ngRxStore/app.reducers';
import * as AuthActions from '../ngRxStore/auth.actions';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    // console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    // install firebase SDK
    // npm install --save firebase
    // this.authService.signInUser(email, password);
    this.store.dispatch(new AuthActions.TrySignIn({ username: email, password: password }));
  }

  onReTry() {
    // this.authService.clearError();
  }
}
