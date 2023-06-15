import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, User } from '../models/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/getAllItems`);
  }

  getItemsCategory(category: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/getItemsCategory/${category}`);
  }

  getJustForYouItems(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/just-for-you`);
  }

  searchItems(query: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/search/${query}`);
  }

  addToCart(userId: User, itemId: string, item: any): Observable<any> {
    const collectionName = item.collectionName;
    return this.http.post(`${this.BASE_URL}/api/addToCart`, {
      userId: userId.id,
      itemId,
      collectionName,
    });
  }

  getCart(userId: User): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/getCart/${userId.id}`);
  }

  removeFromCart(userId: User, itemId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/removeFromCart`, {
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
    return this.http.post<Order>(`${this.BASE_URL}/api/createOrder`, body);
  }

  getOrders(userId: string): Observable<any> {
    return this.http.get<Order[]>(`${this.BASE_URL}/api/getOrders/${userId}`);
  }

  updateOrderStatus(
    orderId: string,
    status: 'processing' | 'shipping' | 'delivered' | 'cancelled'
  ): Observable<Order> {
    const body = { status };
    return this.http.put<Order>(
      `${this.BASE_URL}/api/updateOrderStatus/${orderId}`,
      body
    );
  }
}
