import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, User } from '../models/interfaces';

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

  addToCart(userId: User, itemId: string, item: any): Observable<any> {
    const collectionName = item.collectionName;
    return this.http.post(`${this.BASE_URL}/addToCart`, {
      userId: userId.id,
      itemId,
      collectionName,
    });
  }

  getCart(userId: User): Observable<any> {
    return this.http.get(`${this.BASE_URL}/getCart/${userId.id}`);
  }

  removeFromCart(userId: User, itemId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/removeFromCart`, {
      body: { userId: userId.id, itemId },
    });
  }

  createOrder(
    userId: string,
    items: any[],
    totalCost: number,
    address: string,
    customerName: string
  ): Observable<Order> {
    const body = { userId, items, totalCost, address, customerName };
    return this.http.post<Order>(`${this.BASE_URL}/createOrder`, body);
  }

  getOrders(userId: string): Observable<any> {
    return this.http.get<Order[]>(`${this.BASE_URL}/getOrders/${userId}`);
  }

  updateOrderStatus(
    orderId: string,
    status: 'processing' | 'shipping' | 'delivered' | 'cancelled'
  ): Observable<Order> {
    const body = { status };
    return this.http.put<Order>(
      `${this.BASE_URL}/updateOrderStatus/${orderId}`,
      body
    );
  }
}
