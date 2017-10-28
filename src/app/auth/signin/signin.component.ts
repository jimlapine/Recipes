import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../ngRxStore/app.reducers';
import * as AuthActions from '../ngRxStore/auth.actions';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @Output() isCapsLock = false;
  keyStroke = 0;

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

  onKeyDown(e: KeyboardEvent) {
    this.isCapsLock = e.key === 'CapsLock' && this.keyStroke === 0;
    this.keyStroke =  e.key === 'CapsLock' && this.keyStroke === 0 ? 1 : 0;
    /// console.log(`this.isCapsLock down: ${this.isCapsLock} keystroke: ${ this.keyStroke } `);
  }

  onReTry() {
    // this.authService.clearError();
  }
}
