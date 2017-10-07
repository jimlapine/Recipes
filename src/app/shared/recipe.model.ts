import { Ingredient } from './Ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imgPath: string;
  public Ingredients: Ingredient[];

  constructor(name: string, description: string, imgPath: string, Ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imgPath = imgPath;
    this.Ingredients = Ingredients;
  }
}
