import { Component, OnInit, HostListener } from '@angular/core';
import { AuthentificationService } from './auth/auth.service';
// import firebase SDK
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // handles broswer being closed
  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    // signs user out
    this.authService.signOut();
  }

 constructor(private authService: AuthentificationService) { }

 ngOnInit() {
  // settings from from Firebase - Authertication - Web Setup
  firebase.initializeApp(
    {
      apiKey: 'AIzaSyApscF6Hlk-qg5xZJRwjtMap8eVYiaWzvE',
      authDomain: 'ng-recipe-book-3e610.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-3e610.firebaseio.com',
      projectId: 'ng-recipe-book-3e610',
      storageBucket: 'ng-recipe-book-3e610.appspot.com',
      messagingSenderId: '802451126962'
    });
 }

}
