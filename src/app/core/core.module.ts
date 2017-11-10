import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RecipeService } from '../services/recipe.service';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { DataStorageService } from '../shared/data-storage.service';
@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers : [
    RecipeService,
    DataStorageService,
    // Using a http interceptor requires this special way of informing angular to use it,
    // multi = true allow us to set more than one interceptor
    // Both of these must be imported above
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
}
)

export class CoreModule {

}
