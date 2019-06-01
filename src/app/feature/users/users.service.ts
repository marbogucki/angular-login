import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './user.type';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiURL}/users/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiURL}/users`, user);
  }

  removeUser(user: User): Observable<User> {
    return this.http.delete<User>(`${environment.apiURL}/users/${user.id}`);
  }
}
