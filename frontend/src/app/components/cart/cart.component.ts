import { Component, OnInit } from '@angular/core';
import { ItemData, User } from '../../models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart = [];
  user: User = {} as User;
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.getOrders();
  }

  getOrders(): void {
    this.apiService.getCart(this.user).subscribe(
      (res) => {
        if (res.success) {
          console.log('Retrieved cart successfully');
          this.cart = res.cart.items;
          console.log('Cart: ', this.cart);
        } else {
          console.error('Failed to retrieve cart');
        }
      },
      (err) => console.error('Error: ', err)
    );
  }
}
