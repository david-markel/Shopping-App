import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public dialog: MatDialog,
    public datePipe: DatePipe
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
        console.log('Res: ', res);
        if (res.success) {
          console.log('Retrieved orders successfully ', res);
          this.orders = res.orders;
          console.log('orders: ', this.orders);
        } else {
          console.error('Failed to retrieve orders');
        }
      },
      (err) => console.error('Error: ', err)
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
