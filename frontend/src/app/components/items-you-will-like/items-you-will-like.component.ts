import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';

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
export class ItemsYouWillLikeComponent implements OnInit {
  @Output() itemClicked = new EventEmitter<any>();

  onItemClick(item: any) {
    this.itemClicked.emit(item);
  }

  itemData: ItemData[] = [];
  pages: number[] = [];
  currentPage = 0;

  constructor(private apiService: ApiService) {
    this.pages = Array(Math.ceil(this.itemData.length / 3)).fill(0);
  }

  ngOnInit() {
    this.apiService.getJustForYouItems().subscribe(
      (items: any) => {
        this.itemData = items.map((item: any) => {
          return {
            ...item,
            imageSrc: '../../../assets/items/' + item.imageSrc,
          };
        });
        this.pages = Array(Math.ceil(this.itemData.length / 3)).fill(0);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

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
}
