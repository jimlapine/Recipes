import { Ingrediant } from './ingrediant.model';

export class Recipe {
  public name: string;
  public description: string;
  public imgPath: string;
  public ingrediants: Ingrediant[];

  constructor(name: string, description: string, imgPath: string, ingrediants: Ingrediant[]) {
    this.name = name;
    this.description = description;
    this.imgPath = imgPath;
    this.ingrediants = ingrediants;
  }
}
