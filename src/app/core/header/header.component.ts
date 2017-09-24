import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AuthentificationService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private recipeService: RecipeService, public authService: AuthentificationService) { }

  ngOnInit() { }

  onSave() {
    this.recipeService.onSave().subscribe(
      (response) => {
        // console.log(response);
      },
      (error) => {
        // console.log(error);
      }
    );
  }

  onFetch() {
    this.recipeService.onFetch();
  }

  onLogOut() {
    this.authService.signOut();
  }
}
