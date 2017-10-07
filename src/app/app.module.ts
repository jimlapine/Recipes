import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// import { HttpModule } from '@angular/http';
// Imports the new HTTP Client for angular
import { HttpClientModule } from '@angular/common/http';
// Introduced Lazy Loading
// import { RecipiesModule } from './recipebook/recipes.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';
// Add the ngRx stroe module for out application state store
import { StoreModule } from '@ngRx/store';
import { shoppingListReducer } from './shopping/ngRxStore/shopping-list.reducers';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    // Introduced Lazy Loading
    // RecipiesModule,
    ShoppingModule,
    // Imports the new HTTP Client for angular
    // HttpModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    // register our reducer
    StoreModule.forRoot({ shoppinglist: shoppingListReducer })
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
