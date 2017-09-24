import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../auth/auth.service';

@Component({
  selector: 'app-recipebook',
  templateUrl: './recipebook.component.html',
  styleUrls: ['./recipebook.component.css'],
})

export class RecipebookComponent implements OnInit {

  constructor(public authService: AuthentificationService) { }

  ngOnInit() {  }

}
