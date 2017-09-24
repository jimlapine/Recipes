import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingComponent } from '../shopping/shopping.component';
import { ShoppingListComponent } from '../shopping/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from '../shopping/shopping-list-edit/shopping-list-edit.component';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    // Always import this module, it gives you access to common directives
    CommonModule,
    FormsModule,
    ShoppingRoutingModule
  ],
  providers: [
  ],
  exports: [
  ]
}
)

export class ShoppingModule {

}
