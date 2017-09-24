import { NgModule } from '@angular/core';
// Imports for Routing
import { Routes, RouterModule } from '@angular/router';
import { RecipebookComponent } from '../recipebook/recipebook.component';
import { RecipeDetailComponent } from '../recipebook/recipe-detail/recipe-detail.component';
import { RecipeSelectComponent } from '../recipebook/recipe-select/recipe-select.component';
import { RecipeEditComponent } from '../recipebook/recipe-edit/recipe-edit.component';
import { AuthGuard } from '../auth/auth-guard';

const recipesRoute: Routes = [
  // Updated Path, because of lazy loading in app-routing, recipes path is already defined there
  { path: '', component: RecipebookComponent,
    children: [
      { path: '', component: RecipeSelectComponent, pathMatch: 'full'  },
      // hard coded path should come before dynamic paths
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ]}
  ]

  @NgModule({
    // Imports the router module and adds our route
    imports: [
      // Register defined routes with Angular
      // Use hash option for older set ups, or where you can not configure 404 to point to your index.html
      // RouterModule.forRoot(appRoutes, {useHash: true})
      // This route module if for child routes
      RouterModule.forChild(recipesRoute)
    ],
    providers: [ AuthGuard ],
    // Make the route module available to other components that include this module
    exports: [RouterModule]
  })
  export class RecipesRoutingModule {
  }
