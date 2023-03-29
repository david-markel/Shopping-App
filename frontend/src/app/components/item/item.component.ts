import { Component, Input } from '@angular/core';

interface ItemData {
  imageSrc: string;
  title: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() props: ItemData = { imageSrc: '', title: '', description: '', price: 0 };
}
