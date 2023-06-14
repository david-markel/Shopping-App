import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

import { User } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  user: User = {} as User;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private snackBar: MatSnackBar
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
    this.apiService.getOrders(this.user.id).subscribe(
      (res) => {
        if (res.success) {
          this.orders = [...res.orders].reverse();
        } else {
          this.snackBar.open('Failed to retrieve orders', 'Close', {
            duration: 2000,
          });
        }
        this.isLoading = false;
      },
      (err) => {
        this.snackBar.open('Error loading orders', 'Close', {
          duration: 2000,
        });
        this.isLoading = false;
      }
    );
  }

  viewOrder(order: any): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '600px',
      data: order,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
