import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthentificationService) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    // console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    // install firebase SDK
    // npm install --save firebase
    this.authService.signInUser(email, password);
  }

  onReTry() {
    this.authService.clearError();
  }
}
