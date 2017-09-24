import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../shared/recipe.model';
import { Ingrediant } from '../../shared/ingrediant.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeID: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService ) { }

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
      ingrediants: []
    };
    const recipeIngrediants = new FormArray([]);

    // Get recipe if we are in edit mode
    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.recipeID);
      if (this.recipe.ingrediants.length > 0) {
        for (const ingrediant of this.recipe.ingrediants) {
          recipeIngrediants.push(this.ingrediantGroup(ingrediant));
        }
      }
    }
    const urlPattern = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png|jpeg)$/;
    // Set up form with Recipe
    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe.name, Validators.required),
      'imgPath': new FormControl(this.recipe.imgPath, [Validators.required,
        Validators.pattern(urlPattern)]),
      'description': new FormControl(this.recipe.description, Validators.required),
      'ingrediants': recipeIngrediants
    });
  }

  onSubmit() {
    this.recipe = this.recipeForm.value;
    // console.log(this.recipe);
    this.handleAddUpdate();
    this.backToRecipe();
  }

  // Creates new Ingrediant form group
  ingrediantGroup(ingrediant: Ingrediant): FormGroup {
    const numberPattern = /(^\d*\.?\d*[1-9]+\d*$)|(^[1-9]+\d*\.\d*$)/;

    return new FormGroup({
      'name': new FormControl(ingrediant != null ? ingrediant.name : null, Validators.required),
      'amount': new FormControl(ingrediant != null ? ingrediant.amount : null, [Validators.required,
        // Add regular expression validator
        Validators.pattern(numberPattern)])
    })
  }

  onAddIngediant() {
    (<FormArray>this.recipeForm.get('ingrediants')).insert(0, this.ingrediantGroup(null));
  }

  onDeleteIngrediant(index: number) {
    // remove deleted control
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }

  onRecipeCancel() {
    this.backToRecipe();
  }

  backToRecipe() {
    this.router.navigate(['../', {relativeTo: this.route}]);
  }

  handleAddUpdate() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeID, this.recipe);
    } else {
      this.recipeService.addRecipe(this.recipe);
    }
  }
}
