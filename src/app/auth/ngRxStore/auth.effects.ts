import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import * as firebase from 'firebase';
// Allow us to convert a promise to an obserbable
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthEffects {
  // used to declare a side effect
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    // map returns an observable, which in our case contains the payload (username, password)
    .map((action: AuthActions.TrySignUp) => {
      return action.payload;
    })
    // switchMap will not wrap the results in a new observalbe, where map will
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    // switchMap will not wrap the results in a new observalbe, where map will
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
     })
     // merge map allows us to return more then one observable or action type in our case
    .mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGN_UP,
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token,
        }
      ]
     });

  @Effect()
  authSignIn = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignIn) => {
      // console.log(`action.payload ${ action.payload }`);
      return action.payload;
    }).
    switchMap((authData: { username: string, password: string }) => {
      // console.log(`authData ${ authData.username }, ${ authData.password }`);
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      // console.log(`token ${ token }`);
      this.navigateToRecipes();
      return [
        {
          type: AuthActions.SIGN_IN,
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token,
        }
      ]
    });

  @Effect({ dispatch: false }) // we do not dispatch a new action
  authSignOut = this.actions$
  .ofType(AuthActions.SIGN_OUT)
  .do(() => {
    this.router.navigate(['/']);
  });
  // actions is an observable
  constructor(private router: Router, private actions$: Actions) {}

  navigateToRecipes() {
    // navigate to recipes
    this.router.navigate(['/Recipe']);
  }
}
