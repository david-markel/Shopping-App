import { Component } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  public imageSrc: string = "";
  public title: string = "";
  public description: string = "";
  public price: number = 0;
}
