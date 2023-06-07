import { Component, OnInit } from '@angular/core';
import { ItemData, User } from '../../models/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private utilsService: UtilsService,
    private snackBar: MatSnackBar
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

  removeItemFromCart(item: ItemData): void {
    console.log('item: ', item);
    this.apiService.removeFromCart(this.user, item._id).subscribe(
      (res) => {
        if (res.success) {
          console.log('Item removed successfully');
          this.snackBar.open('Item removed successfully', 'Close', {
            duration: 2000,
          });
          this.getCart();
        } else {
          console.error('Failed to remove item from cart');
          this.snackBar.open('Error removing item from cart', 'Close', {
            duration: 2000,
          });
        }
      },
      (err) => {
        console.error('Error: ', err);
        this.snackBar.open('Error removing item from cart', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
