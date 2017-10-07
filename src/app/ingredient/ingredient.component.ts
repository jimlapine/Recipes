import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

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
