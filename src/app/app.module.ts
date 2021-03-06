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
import { reducers } from './ngRxStore/app.reducers';
import { AuthEffects } from './auth/ngRxStore/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment'; // Allows us to check whether we are in prod or dev, see StoreDevtools
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
    // register our reducers
    StoreModule.forRoot(reducers),
    // register our side effects, we could have more than one
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule, // tracks router state changes
    !environment.production ? StoreDevtoolsModule.instrument() : [] // StoreDevToolsModule requires ReDex DevTools chrome extension
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
