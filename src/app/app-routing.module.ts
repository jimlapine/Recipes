import { NgModule } from '@angular/core';
// Imports for Routing
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './core/home/home.component';

// Routes constant
const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // loadChildren implements lazy loading of the RecipebookComponent
  // relative path with a # and the class name
  { path: 'Recipe', loadChildren: './recipebook/recipes.module#RecipesModule' },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  // Imports the router module and adds our route
  imports: [
    // Register defined routes with Angular
    // Use hash option for older set ups, or where you can not configure 404 to point to your index.html
    // RouterModule.forRoot(appRoutes, {useHash: true})
    // preloadingStrategy allows us to difne a stragety for loading our lazy loaded modules in the background behind the scenes
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  // Make the route module available to other components that include this module
  exports: [RouterModule]
})
export class AppRoutingModule {
}
