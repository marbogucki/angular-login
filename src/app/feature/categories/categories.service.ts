import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Category} from './category.type';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiURL}/categories`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.apiURL}/categories`, category);
  }

  removeCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${environment.apiURL}/categories/${category.id}`);
  }
}
