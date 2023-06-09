// orders.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

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
}
