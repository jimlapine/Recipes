import { Component,  OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {
  recipes: Recipe[];
  recipeID: number;
  recipesChangedSubscription: Subscription;

  // Inject the recipe service
  constructor(private recipeService: RecipeService,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipeService.onFetch();

    this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    // clean up our subscription, so we have no memory leaks
    this.recipesChangedSubscription.unsubscribe();
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
