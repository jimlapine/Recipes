import { Component,  OnInit, Output } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRecipe from 'app/recipebook/ngRxStore/recipe.reducers';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  recipeID: number;

  // Inject the recipe service
  constructor(private store: Store<fromRecipe.FeatureState>,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
    // console.log(`recipeState: ${ this.recipeState }`);
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  // My original solution to getting recipe to the Recipe Item component
  // recipeClicked(recipe: Recipe) {
  //   // Get Recipe ID
  //   this.recipeID = this.recipes.findIndex(
  //     (elem, indx) => {
  //       if (elem.name === recipe.name) {
  //         return true;
  //       }
  //     }
  //   );

  //   this.router.navigate(['/Recipe', this.recipeID], { relativeTo: this.route });
  // }
}
