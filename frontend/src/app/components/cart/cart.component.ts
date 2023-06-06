import { Component, OnInit } from '@angular/core';
import { ItemData, User } from '../../models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: ItemData[] = [];
  user: User = {} as User;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.getCart();
      }
    });
  }

  getCart(): void {
    this.apiService.getCart(this.user).subscribe(
      (res) => {
        if (res.success) {
          console.log('Retrieved cart successfully');
          this.cart = this.utilsService.processItems(res.cart.items);
          console.log('Cart: ', this.cart);
        } else {
          console.error('Failed to retrieve cart');
        }
      },
      (err) => console.error('Error: ', err)
    );
  }
}
