import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.match('/login')) {
      return next.handle(req);
    }

    if (!this.authService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      const authenticatedRequest = req.clone({
        setHeaders: {
          Authorization: this.authService.getBearerToken()
        }
      });

      return next.handle(authenticatedRequest);
    }
  }
}
