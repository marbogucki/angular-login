import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

interface SystemToken {
  roles: string[];
}

interface LoginFormData {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private currentRoles: string[];

  constructor(private http: HttpClient, private router: Router) {
  }

  login(formData: LoginFormData, targetUrl?: string): void {
    this.http.get<Array<{ token: string }>>(`${environment.apiURL}/login`)
      .pipe(
        map(result => result[0]),
      )
      .subscribe(({token}) => {
        this.token = token;
        this.currentRoles = jwt_decode<SystemToken>(token).roles;

        if (targetUrl) {
          this.router.navigateByUrl(targetUrl);
        } else {
          this.router.navigate(['/users']);
        }
      });
  }

  isLogged(): boolean {
    return !!this.token;
  }

  isInRole(role: 'admin' | 'client'): boolean {
    return this.currentRoles.includes(role);
  }
}
