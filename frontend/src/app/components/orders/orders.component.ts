// orders.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orders = [
      { id: '1', status: 'Delivered', customer: 'John Doe', date: '2023-05-10', total: 100.00 },
      { id: '2', status: 'Processing', customer: 'Jane Smith', date: '2023-05-15', total: 200.00 },
      { id: '3', status: 'Shipped', customer: 'Mike Johnson', date: '2023-05-20', total: 150.00 },
      { id: '4', status: 'Cancelled', customer: 'Emily Davis', date: '2023-05-22', total: 120.00 }
    ];
  }
  
}
