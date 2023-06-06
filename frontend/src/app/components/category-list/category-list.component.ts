import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  items: any[] = [];
  category: string = 'movies';
  @Output() itemClicked = new EventEmitter<any>();

  onItemClick(item: any) {
    this.itemClicked.emit(item);
  }

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['query']) {
        const searchQuery = params['query'];
        this.apiService.searchItems(searchQuery).subscribe(
          (items: any) => {
            this.items = items.map((item: any) => {
              return {
                ...item,
                imageSrc: '../../../assets/items/' + item.imageSrc,
              };
            });
            console.log('Data:', this.items);
          },
          (error) => {
            // console.error('Error:', error);
          }
        );
      } else if (params['category']) {
        this.category = params['category'];
        this.loadData();
      }
    });
  }

  loadData(): void {
    if (this.category === 'all') {
      this.apiService.getAllItems().subscribe(
        (items: any) => {
          this.items = this.utilsService.processItems(items);
          console.log('Data:', this.items);
        },
        (error) => {
          // console.error('Error:', error);
        }
      );
    } else {
      this.apiService.getItemsCategory(this.category).subscribe(
        (items: any) => {
          this.items = this.utilsService.processItems(items);
          console.log('Data:', this.items);
        },
        (error) => {
          // console.error('Error:', error);
        }
      );
    }
  }
}
