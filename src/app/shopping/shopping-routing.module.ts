import { NgModule } from '@angular/core';
// Imports for Routing
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from '../shopping/shopping.component';

const shoppingRoute: Routes = [
    { path: 'Shopping', component: ShoppingComponent},
  ]

  @NgModule({
    // Imports the router module and adds our route
    imports: [
      // Register defined routes with Angular
      // Use hash option for older set ups, or where you can not configure 404 to point to your index.html
      // RouterModule.forRoot(appRoutes, {useHash: true})
      // This route module if for child routes
      RouterModule.forChild(shoppingRoute)
    ],
    // Make the route module available to other components that include this module
    exports: [RouterModule]
  })
  export class ShoppingRoutingModule {
  }
