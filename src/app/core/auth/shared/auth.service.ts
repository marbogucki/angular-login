import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

interface SystemToken {
  roles: UserRoles[];
  iat: number;
  exp: number;
  name: string;
  sub: string;
}

interface LoginFormData {
  login: string;
  password: string;
}

type UserRoles = 'admin' | 'client';

const hasDateExpired = (timeStamp: number) => Date.now() >= timeStamp * 1000;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = new BehaviorSubject('');
  private currentRoles: Observable<UserRoles[]> = this.token.asObservable().pipe(map(token => jwt_decode<SystemToken>(token).roles));

  constructor(private http: HttpClient, private router: Router) {
  }

  login(formData: LoginFormData, targetUrl?: string): void {
    this.http.get<Array<{ token: string }>>(`${environment.apiURL}/login`)
      .pipe(
        map(result => result[0]),
      )
      .subscribe(({token}) => {
        this.token.next(token);

        jwt_decode<SystemToken>(token);

        if (targetUrl) {
          this.router.navigateByUrl(targetUrl);
        } else {
          this.router.navigate(['/users']);
        }
      });
  }

  isLogged(): boolean {
    return !!this.token.value && !hasDateExpired(jwt_decode<SystemToken>(this.token.value).exp);
  }

  isLogged$(): Observable<boolean> {
    return this.token.asObservable().pipe(map(token => !!token));
  }

  areInRoles(roles: Array<UserRoles>): Observable<boolean> {
    return this.currentRoles.pipe(map(userRoles => userRoles.some(role => roles.includes(role))));
  }

  logOut() {
    this.token.next('');
    this.router.navigate(['/login']);
  }
}
