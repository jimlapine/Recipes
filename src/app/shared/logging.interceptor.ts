import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do allows us to get to the data on any observable with out subscribing and consuming it.
    // we pass the request along and use the do operator on the observable, so that we do not consume it
    return next.handle(req).do(
      (event) => {
        console.log(`LoggingInterceptor event.type: ${event.type}`);
      }
    );
  }
}
