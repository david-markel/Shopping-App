import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ItemData, Order, User } from '../../models/interfaces';
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
  private unsubscribe$ = new Subject<void>();

  cart: ItemData[] = [];
  user: User = {} as User;
  quantities: number[] = [];

  isLoading = true;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.user
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.getCart();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCart(): void {
    this.apiService.getCart(this.user).subscribe(
      (res) => {
        if (res.success) {
          this.cart = this.utilsService.processItems(res.cart.items);
          this.quantities = Array(this.cart.length).fill(1);
        }
        this.isLoading = false;
      },
      (err) => {
        this.snackBar.open('Error loading cart', 'Close', {
          duration: 2000,
        });
        this.isLoading = false;
      }
    );
  }

  removeItemFromCart(item: ItemData): void {
    this.apiService.removeFromCart(this.user, item._id).subscribe(
      (res) => {
        // ...

        if (res.success) {
          this.snackBar.open('Item removed successfully', 'Close', {
            duration: 2000,
          });
          this.getCart();
        } else {
          this.snackBar.open('Failed to remove item from cart', 'Close', {
            duration: 2000,
          });
        }
      },
      (err) => {
        this.snackBar.open('Error removing item from cart', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  totalCost(): number {
    return this.cart.reduce(
      (total, item, index) => total + item.price * this.quantities[index],
      0
    );
  }

  createOrder(billingInfo: any): void {
    const totalCost = this.totalCost();
    const address = billingInfo.address1 + ' ' + billingInfo.address2;
    const customerName = billingInfo.firstName + ' ' + billingInfo.lastName;

    const cartWithQuantities = this.cart.map((item, index) => ({
      ...item,
      quantity: this.quantities[index],
    }));

    this.apiService
      .createOrder(
        this.user.id,
        cartWithQuantities,
        totalCost,
        address,
        customerName
      )
      .subscribe(
        (res: Order) => {
          this.snackBar.open('Order created successfully', 'Close', {
            duration: 2000,
          });
          this.cart = [];
        },
        (err) => {
          this.snackBar.open('Error creating order', 'Close', {
            duration: 2000,
          });
        }
      );
  }

  incrementQuantity(index: number) {
    this.quantities[index]++;
  }

  decrementQuantity(index: number) {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
    }
  }
}
