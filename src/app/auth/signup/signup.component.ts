import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../ngRxStore/app.reducers';
import * as AuthActions from '../ngRxStore/auth.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(public store: Store<fromApp.AppState>) { }

  ngOnInit() {

  }

  onSignUp(form: NgForm) {
    // console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    // install firebase SDK
    // npm install --save firebase
    // this.authService.signupUser(email, password);
    this.store.dispatch(new AuthActions.TrySignUp({ username: email, password: password }));
  }

  onReTry() {
    // this.authService.clearError();
  }
}
