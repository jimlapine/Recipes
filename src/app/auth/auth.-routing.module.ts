import { NgModule } from '@angular/core';
// Imports for Routing
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';

const authRoute: Routes = [
  { path: 'Signup', component: SignupComponent},
  { path: 'Signin', component: SigninComponent},
  ]

  @NgModule({
    // Imports the router module and adds our route
    imports: [
      // Register defined routes with Angular
      // Use hash option for older set ups, or where you can not configure 404 to point to your index.html
      // RouterModule.forRoot(appRoutes, {useHash: true})
      // This route module if for child routes
      RouterModule.forChild(authRoute)
    ],
    // Make the route module available to other components that include this module
    exports: [RouterModule]
  })
  export class AuthRoutingModule {
  }
