import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
})
export class OrderDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    private apiService: ApiService
  ) {
    this.dialogRef.beforeClosed().subscribe(() => {
      if (this.data.status !== 'cancelled') {
        let updatedStatus: 'processing' | 'shipping' | 'delivered';
        if (this.data.status === 'processing') updatedStatus = 'shipping';
        else if (this.data.status === 'shipping') updatedStatus = 'delivered';
        else return;

        this.apiService
          .updateOrderStatus(this.data._id, updatedStatus)
          .subscribe();
      }
    });
  }

  cancelOrder(): void {
    this.apiService.updateOrderStatus(this.data._id, 'cancelled').subscribe(
      (res) => {
        console.log('Order status updated successfully ', res);
      },
      (err) => console.error('Failed to update order status', err)
    );
  }
}
