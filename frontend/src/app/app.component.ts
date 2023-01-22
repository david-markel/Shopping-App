import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public counter = 0;

  public onClick() {
    this.counter += 1;
    console.log("Counter: ", this.counter)
  }
}
