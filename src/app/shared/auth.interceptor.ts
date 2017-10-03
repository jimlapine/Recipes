import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthentificationService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthentificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // requests are immutable, you can't change them
    // clone the request, with allows us to create a modified clone, by passing in a JavaScript object
    // We can create a clone with updated headers, params, etc.
    const token = this.authService.getToken();
    const params = new HttpParams().set('auth', token);
    const newRequest = req.clone({ params: params });
    // Class example:
    // const newRequest = req.clone({ params: req.params.set('auth', token) });
    console.log(`AuthInterceptor Request: ${ newRequest }`);
    return next.handle(newRequest);
  }
}
