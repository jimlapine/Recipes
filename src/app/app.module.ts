import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// Imports the new HTTP Client for angular
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';
// Add the ngRx stroe module for out application state store
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping/ngRxStore/shopping-list.reducers';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    ShoppingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    // register our reducer
    StoreModule.forRoot({ shoppinglist: shoppingListReducer })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
