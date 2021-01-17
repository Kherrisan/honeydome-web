import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd/message';
import {OauthService} from './oauth.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private message: NzMessageService, private oauth: OauthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq;
    if (req.url.includes('/login/oauth/authorize')) {
      cloneReq = req.clone({
        headers: req.headers.delete('Origin')
      });
    } else {
      cloneReq = req;
    }
    return next.handle(cloneReq).pipe(
      map((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          switch (evt.status) {
            case 200:
              break;
            case 401:
              this.oauth.redirectOauthPage();
              break;
            case 500:
              this.message.error('500 ERROR: ' + evt.body);
              break;
          }
        }
        return evt;
      })
    );
  }
}
