import { Component, OnInit } from '@angular/core';
import { ItemData } from '../../models/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: ItemData[] = [
    {
      imageSrc: '../../../assets/items/itemImages/clothing/Mens_Black_TShirt.jpg',
      title: "Men's Black T-Shirt",
      description: 'A classic black t-shirt made from soft cotton for everyday wear',
      price: 19.99,
    },
    {
      imageSrc: '../../../assets/items/itemImages/clothing/Womens_White_Blouse.jpg',
      title: "Women's White Blouse",
      description: 'A stylish white blouse made from lightweight fabric for a comfortable and chic look',
      price: 39.99,
    },
    {
      imageSrc: '../../../assets/items/itemImages/clothing/Mens_Dress_Shirt.jpg',
      title: "Men's Dress Shirt",
      description: 'A crisp white dress shirt made from high-quality cotton for a professional look',
      price: 49.99,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
  
}
