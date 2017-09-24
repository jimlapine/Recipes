import { Component, OnInit, Input } from '@angular/core';
import { Ingrediant } from '../shared/ingrediant.model';

@Component({
  selector: 'app-ingrediant',
  templateUrl: './ingrediant.component.html',
  styleUrls: ['./ingrediant.component.css']
})
export class IngrediantComponent implements OnInit {
  @Input() recipeIngrediants: Ingrediant[];

  constructor() { }

  ngOnInit() { }

}
