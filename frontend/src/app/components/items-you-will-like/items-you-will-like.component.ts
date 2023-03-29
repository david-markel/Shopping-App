import { Component } from '@angular/core';

interface ItemData {
  imageSrc: string;
  title: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-items-you-will-like',
  templateUrl: './items-you-will-like.component.html',
  styleUrls: ['./items-you-will-like.component.scss']
})
export class ItemsYouWillLikeComponent {
  itemData: ItemData[] = [
    {
      imageSrc: '../../assets/itemImages/blackCouch.jpg',
      title: 'Black Couch',
      description: 'A comfortable black couch',
      price: 799.99
    },
    {
      imageSrc: '../../assets/itemImages/ds.jpg',
      title: 'Nintendo DS',
      description: 'A handheld video game console',
      price: 149.99
    },
    {
      imageSrc: '../../assets/itemImages/yellowDress.jpg',
      title: 'Yellow Dress',
      description: 'A sunny yellow dress',
      price: 39.99
    }
  ];
}
