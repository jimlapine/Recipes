import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  @Input() recipeIngredients: Ingredient[];

  constructor() { }

  ngOnInit() { }

}
