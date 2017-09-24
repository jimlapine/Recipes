import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// import { ShoppingService } from './services/shopping.service';
// import { RecipeService } from './services/recipe.service';
import { HttpModule } from '@angular/http';
// import { AuthentificationService} from './auth/auth.service';
// Introduced Lazy Loading
// import { RecipiesModule } from './recipebook/recipes.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module'
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
    HttpModule,
    SharedModule,
    CoreModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
