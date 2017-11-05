import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipebookComponent } from '../recipebook/recipebook.component';
import { RecipeListComponent } from '../recipebook/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from '../recipebook/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from '../recipebook/recipe-list/recipe-item/recipe-item.component';
import { RecipeSelectComponent } from '../recipebook/recipe-select/recipe-select.component';
import { RecipeEditComponent } from '../recipebook/recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from '../recipebook/recipe-routing.module';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { RecipeReducer } from './ngRxStore/recipe.reducers';
@NgModule({
  declarations: [
    RecipebookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeSelectComponent,
    RecipeEditComponent,
    IngredientComponent
  ],
  imports: [
    // Always import this module, it gives you access to common directives
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', RecipeReducer) // Add store module for recipe module, also lets us use lazy loading
  ]
})
export class RecipesModule {

}
