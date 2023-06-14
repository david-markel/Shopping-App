import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ItemData } from 'src/app/models/interfaces';

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
  isLoading = true;

  onItemClick(item: any) {
    this.itemClicked.emit(item);
  }

  itemData: ItemData[] = [];
  pages: number[] = [];
  currentPage = 0;

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
    private snackBar: MatSnackBar
  ) {
    this.pages = Array(3).fill(0);
  }

  ngOnInit() {
    this.apiService.getJustForYouItems().subscribe(
      (items: any) => {
        this.itemData = this.utilsService.processItems(items);
        this.isLoading = false;
      },
      (error) => {
        this.snackBar.open('Error loading items', 'Close', {
          duration: 2000,
        });
        this.isLoading = false;
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
