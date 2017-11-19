import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { AuthRoutingModule } from './auth.-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    // Always import this module, it gives you access to common directives
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
  ],
  exports: [
  ]
}

)
export class AuthModule {

}
