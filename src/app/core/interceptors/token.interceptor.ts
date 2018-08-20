import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {MessageActions} from '../message.actions';

const appKey = 'kid_BJW3zX1Hm';
const appSecret = 'cdb633bda8e241abbb5f0f778fa0782b';
const guest = 'guest';
const password = 'guest';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private message: MessageActions) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('login') || req.url.endsWith(appKey)) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
          'Content-Type': 'application/json'
        }
      });
    }
    else if(req.url.includes('upload')){
      req = req.clone({
        setHeaders: {
         'X-Requested-With': 'XMLHttpRequest'
        }
      })
    }
    else {
      if(localStorage.getItem('authtoken') !== null){
        req = req.clone({
          setHeaders: {
            'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
            'Content-Type': 'application/json'
          }
        });
      }
      else{
        req = req.clone({
          setHeaders: {
            'Authorization': `Basic ${btoa(`${guest}:${guest}`)}`,
            'Content-Type': 'application/json'
          }
        });
      }

    }

    return next.handle(req).pipe(tap((event : HttpEvent<any>) => {
      if (event instanceof HttpResponse && req.url.endsWith('login')) {
          localStorage.setItem('authtoken', event.body._kmd.authtoken);
          localStorage.setItem('id', event.body._id);
      }
    }, (err : any) => {
      if (err instanceof HttpErrorResponse) {
        switch(err.status) {
          case 401:
            this.message.error(err['error']['description']);
            this.router.navigate(['/login']);
            break;
          case 404:
            this.message.error(err['error']['description']);
            this.router.navigate(['/not-found']);
            break;
          default:
            this.message.error(err['error']['description']);
            break;
        }
      }
    }));
  }
}

