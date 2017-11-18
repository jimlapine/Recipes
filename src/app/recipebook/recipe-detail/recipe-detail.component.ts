import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as recipeActons from '../ngRxStore/recipe.actions';
import 'rxjs/add/operator/take';
// bundles exverything exported from shopping-list.actions into one JavaScript object
import * as ShoppingListActions from '../../shopping/ngRxStore/shopping-list.actions';
import * as fromRecipe from 'app/recipebook/ngRxStore/recipe.reducers';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  detailState: Observable<fromRecipe.State>;
  id: number;
  constructor(private router: Router,
    private route: ActivatedRoute, private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    // Subscribe to Params being passed in
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.detailState = this.store.select('recipes');
      }
    );
   }

  onRecipeEdit() {
    // Class Demo Navigation
    this.router.navigate(['edit'], { relativeTo: this.route });
    // Class Alternate
    // this.router.navigate(['../', this.id, 'edit'],  { relativeTo: this.route });

    // My Original solution
    // this.router.navigate(['/Recipe', this.id, 'edit']);
  }

  toShoppingList() {
    // I directly utilized the shopping service
    // this.details.Ingredients.forEach(element => {
    //   this.shoppingService.AddIngredient(element);
    // });

    // Class example injected shopping service into recipe service
    // this.recipeServce.addIngredientsToShoppingList(this.details.ingredients);
    this.store.select('recipes')
      .take(1) // makes sure this does not fire on every state change
      .subscribe(
        (recipeState: fromRecipe.State) => {
          this.store.dispatch(new ShoppingListActions.AddIngredients(
            recipeState.recipes[this.id].ingredients));
        }
      );

    // console.log('this.details.ingredients: ', this.details.ingredients);
  }

  onDeleteRecipe() {
    if (confirm('Are you sure that you want to delete this recipe?')) {
      this.store.dispatch(new recipeActons.DeleteRecipe(this.id));
      // this.recipeServce.deleteRecipe(this.id);
      this.router.navigate(['/Recipe']);
    }
  }
}
