import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as fromApp from '../ngRxStore/app.reducers';
import * as fromAuth from '../auth/ngRxStore/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // requests are immutable, you can't change them
    // clone the request, with allows us to create a modified clone, by passing in a JavaScript object
    // We can create a clone with updated headers, params, etc.
    // const token = this.store.select('auth').map((authState: fromAuth.State) => {
    //     return authState.token;
    //   });

    // const params = new HttpParams().set('auth', token);
    // const newRequest = req.clone({ params: params });
    // Class example:

    console.log(`AuthInterceptor Request: ${ req }`);

    // switchMap will not wrap the results in a new observalbe, where map will
    // Get the state, which is an observable, swithmap to get the token,
    // add the token to the parameter of our cloned request and return it
    return this.store.select('auth')
      .take(1) // Take 1 means only do this operatation once, not each time app state is changed
      .switchMap((authState: fromAuth.State) => {
      const newRequest = req.clone({ params: req.params.set('auth', authState.token) });
      return next.handle(newRequest);
    });
  }
}
