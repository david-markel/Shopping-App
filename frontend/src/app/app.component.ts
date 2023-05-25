import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  selectedItem: any;

  constructor(public router: Router) {}

  onItemSelected(item: any) {
    this.selectedItem = item;
  }
  
}
