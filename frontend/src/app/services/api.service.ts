import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/getAllItems`);
  }

  getItemsCategory(category: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/getItemsCategory/${category}`);
  }

  getJustForYouItems(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/just-for-you`);
  }

  searchItems(query: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/search/${query}`);
  }

  addToCart(userId: User, itemId: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/addToCart`, {
      userId: userId.id,
      itemId,
    });
  }

  getCart(userId: User): Observable<any> {
    console.log('id: ', userId);
    return this.http.get(`${this.BASE_URL}/getCart/${userId.id}`);
  }
}
