import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthentificationService) { }

  ngOnInit() {

  }

  onSignUp(form: NgForm) {
    // console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    // install firebase SDK
    // npm install --save firebase
    this.authService.signupUser(email, password);
  }

  onReTry() {
    this.authService.clearError();
  }
}
