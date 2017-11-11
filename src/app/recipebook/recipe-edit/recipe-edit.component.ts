import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../shared/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as recipeActons from '../ngRxStore/recipe.actions';
import { StartEdit } from 'app/shopping/ngRxStore/shopping-list.actions';
import * as fromRecipe from 'app/recipebook/ngRxStore/recipe.reducers';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeID: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeState: Observable<fromRecipe.State>;
  recipe: Recipe;
  constructor(private router: Router, private route: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState> ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params) => {
        this.recipeID = +params['id'];
        // Edit mode will only be true when id is null
        this.editMode = params['id'] != null;
        // console.log(`recipeID: ${this.recipeID}`);
        this.initForm();
      }
    );
  }

  private initForm() {
    // Set to empty recipe by default
    this.recipe = {
      name: '',
      imgPath: '',
      description: '',
      ingredients: []
    };
    const recipeIngredients = new FormArray([]);

    // Get recipe if we are in edit mode
    if (this.editMode) {
      this.store.select('recipes')
        .take(1)
        .subscribe(
          (recipeState: fromRecipe.State) => {
            this.recipe = recipeState.recipes[this.recipeID];
            // console.log('this.recipe: ', this.recipe);
            if (this.recipe.ingredients.length > 0) {
              for (const ingredient of this.recipe.ingredients) {
                recipeIngredients.push(this.IngredientGroup(ingredient));
              }
            }
          }
      );

    }
    const urlPattern = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png|jpeg)$/;
    // Set up form with Recipe
    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe.name, Validators.required),
      'imgPath': new FormControl(this.recipe.imgPath, [Validators.required,
        Validators.pattern(urlPattern)]),
      'description': new FormControl(this.recipe.description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    this.recipe = this.recipeForm.value;
    // console.log(this.recipe);
    this.handleAddUpdate();
    this.backToRecipe();
  }

  // Creates new Ingredient form group
  IngredientGroup(ingredient: Ingredient): FormGroup {
    const numberPattern = /(^\d*\.?\d*[1-9]+\d*$)|(^[1-9]+\d*\.\d*$)/;

    return new FormGroup({
      'name': new FormControl(ingredient != null ? ingredient.name : null, Validators.required),
      'amount': new FormControl(ingredient != null ? ingredient.amount : null, [Validators.required,
        // Add regular expression validator
        Validators.pattern(numberPattern)])
    })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).insert(0, this.IngredientGroup(null));
  }

  onDeleteIngredient(index: number) {
    if (confirm('Are you sure that you want to delete this Ingredient?')) {
      // remove deleted control
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
  }

  onRecipeCancel() {
    this.backToRecipe();
  }

  backToRecipe() {
    this.router.navigate(['../', {relativeTo: this.route}]);
  }

  handleAddUpdate() {
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.recipeID, this.recipe);
      this.store.dispatch(new recipeActons.UpdateRecipe({ id: this.recipeID, updatedRecipe: this.recipe }))
    } else {
      // this.recipeService.addRecipe(this.recipe);
      this.store.dispatch(new recipeActons.AddRecipe(this.recipe));
    }
  }
}
