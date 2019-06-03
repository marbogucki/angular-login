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

const tokenIsValid = token => {
  try {
    jwt_decode(token);
    return true;
  } catch (e) {
    return false;
  }
};

const localStorageAccess = ((key) => ({
  get: () => localStorage.getItem(key) || '',
  set: (token: string) => localStorage.setItem(key, token),
  remove: () => localStorage.removeItem(key)
}))('jwt_token');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = new BehaviorSubject('');
  private currentRoles: Observable<UserRoles[]> =
    this.token.asObservable().pipe(map(() => jwt_decode<SystemToken>(localStorageAccess.get()).roles));

  constructor(private http: HttpClient, private router: Router) {
  }

  login(formData: LoginFormData, targetUrl?: string): void {
    this.http.get<Array<{ token: string }>>(`${environment.apiURL}/login`)
      .pipe(
        map(result => result[0]),
      )
      .subscribe(({token}) => {
        localStorageAccess.set(token);
        this.token.next(token);

        if (targetUrl) {
          this.router.navigateByUrl(targetUrl);
        } else {
          this.router.navigate(['/users']);
        }
      });
  }

  isLogged(): boolean {
    const token = localStorageAccess.get();
    return !!token && tokenIsValid(token) && !hasDateExpired(jwt_decode<SystemToken>(token).exp);
  }

  areInRoles(roles: Array<UserRoles>): Observable<boolean> {
    return this.currentRoles.pipe(map(userRoles => userRoles.some(role => roles.includes(role))));
  }

  logOut() {
    this.token.next('');
    localStorageAccess.remove();
    this.router.navigate(['/login']);
  }
}
