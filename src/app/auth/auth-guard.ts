import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../ngRxStore/app.reducers';
import * as fromAuth from './../auth/ngRxStore/auth.reducers';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState> ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .take(1) // Only do this once
      .map((authState: fromAuth.State) => {
      return authState.isAuthenticated;
    });
  }
}
