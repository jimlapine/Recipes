import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  details: Recipe;
  id: number;
  constructor(private recipeServce: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Subscribe to Params being passed in
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.details = this.recipeServce.getRecipe(this.id);
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
    // this.details.ingrediants.forEach(element => {
    //   this.shoppingService.AddIngrediant(element);
    // });

    // Class example injected shopping service into recipe service
    this.recipeServce.addIngrediantsToShoppingList(this.details.ingrediants);
  }

  onDeleteRecipe() {
    if (confirm('Are you sure that you want to delete this recipe?')) {
      this.recipeServce.deleteRecipe(this.id);
      this.router.navigate(['/Recipe']);
    }
  }
}
