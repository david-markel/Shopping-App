import { Component, Output, EventEmitter } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';



interface ItemData {
  imageSrc: string;
  title: string;
  description: string;
  price: number;
}

const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
]);

@Component({
  selector: 'app-items-you-will-like',
  templateUrl: './items-you-will-like.component.html',
  styleUrls: ['./items-you-will-like.component.scss'],
  animations: [fadeIn],
})
export class ItemsYouWillLikeComponent {
  @Output() itemClicked = new EventEmitter<any>();

  onItemClick(item: any) {
    this.itemClicked.emit(item);
  }

  pages: number[] = [];

constructor() {
  this.pages = Array(Math.ceil(this.itemData.length / 3)).fill(0);
}


  currentPage = 0;

  onLeftArrowClick() {
    const maxPages = Math.ceil(this.itemData.length / 3) - 1;
    if (this.currentPage === 0) {
      this.currentPage = maxPages;
    } else {
      this.currentPage--;
    }
  }
  
  onRightArrowClick() {
    const maxPages = Math.ceil(this.itemData.length / 3) - 1;
    if (this.currentPage === maxPages) {
      this.currentPage = 0;
    } else {
      this.currentPage++;
    }
  }
  
  

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
    },
    {
      imageSrc: "../../assets/items/itemImages/games/The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
      title: "The Legend of Zelda: Breath of the Wild",
      description: "An action-adventure game where players control Link and explore the vast open world of Hyrule",
      price: 59.99
  },
  {
    imageSrc: "../../assets/items/itemImages/furniture/Accent_Chair.jpg",
    title: "Accent Chair",
    description: "A unique and stylish accent chair, perfect for adding personality to any room",
    price: 399.99
    },
    {
      imageSrc: "../../assets/items/itemImages/furniture/Bar_Cabinet.jpg",
      title: "Bar Cabinet",
      description: "A sophisticated and functional bar cabinet, great for storing and displaying liquor and barware",
      price: 899.99
      },
      {
        imageSrc: "../../assets/items/itemImages/household/HEPA_Air_Purifier.jpg",
        title: "HEPA Air Purifier",
        description: "A compact HEPA air purifier to keep your home fresh and allergen-free",
        price: 99.99
    },
    {
      imageSrc: "../../assets/items/itemImages/toys/Nerf_Gun.jpg",
      title: "Nerf Gun",
      description: "A powerful Nerf gun with foam darts for exciting battles",
      price: 29.99
  },
  {
    imageSrc: "../../assets/items/itemImages/groceries/Organic_Milk.jpg",
    title: "Organic Milk",
    description: "A half-gallon of organic milk for a healthier and fresher option",
    price: 3.99
    },
  ];
}