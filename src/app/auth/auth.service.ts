import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import firebase SDK
import * as firebase from 'firebase';

@Injectable()
export class AuthentificationService {
  token: string;
  error: string;

  constructor(private router: Router) {}

  // firebase app is intialized when appication loads, see app.compnent.ts ngOnInIt
  signupUser(email: string, password: string) {
    // this creates a  user and returns a promise, where we can use .then and .catch
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      (token: string) => {
        this.token = token;
        this.router.navigate(['/Recipe']);
      }
    )
    .catch(
      (error) => {
        // console.log(error);
        this.error = error.message;
      }
    )
  }

  signInUser(email: string, password: string) {
    // this creates a  user and returns a promise, where we can use .then and .catch
    // firebase SDK stores the token for us. To see it, check chrome dev tools application,  local storage
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          this.router.navigate(['/Recipe']);
          // console.log(response);
          this.getToken();
        }
      )
      .catch(
        (error) => {
          // console.log(error);
          this.error = error.message;
        }
      )
  }

  getToken() {
    // console.log('firebase.auth().currentUser:', firebase.auth().currentUser);
    // this is an ansychronous call, it returns a promise
    // It will determine if token is present, and attempt tp get a new one frome firebase if not
    if (firebase.auth().currentUser !== null) {
      firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        );
    }
    return this.token;
  }

  isAuthenticated() {
    // console.log(`isAuthenticated:  ${this.token != null}`);
    if (this.token === undefined) {
      if (!firebase.auth().currentUser) {
        let hasLocalStorageUser = false;
        for (const key in localStorage) {
          // grab the toke from local storage
          if (key.startsWith('firebase:authUser:')) {
            hasLocalStorageUser = true;
            const localStorageObject = JSON.parse(localStorage[key]);
            const token = localStorageObject.stsTokenManager.accessToken;
            console.log(`token: ${token}`);
            // console.log(token);
            this.token = token;
          }
        }
        if (!hasLocalStorageUser) {
          // console.log('Attempting to access a secure route. Please authenticate first.');
          // replace({
          // pathname: '/login',
          // state: { nextPathname: nextState.location.pathname }
          // });
        }
      }
    }
    return (this.token != null);
  }

  signOut() {
    firebase.auth().signOut()
      .then(
        (response) => {
          // Sign-out successful.
          console.log(response);
          this.router.navigate(['/Signin']);
          this.token = null;
        }
      )
      .catch(
        (error) => {
          // An error happened.
          // console.log(error);
          this.error = error.message;
        }
      )
  }

  getError() {
    return this.error;
  }

  clearError() {
    this.error = null;
  }
}