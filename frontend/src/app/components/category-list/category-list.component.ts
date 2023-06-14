import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isLoading = true;
  error = false;

  @Output() itemClicked = new EventEmitter<any>();

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['query']) {
        const searchQuery = params['query'];
        this.apiService.searchItems(searchQuery).subscribe(
          (items: any) => {
            this.items = this.utilsService.processItems(items);
            this.isLoading = false;
          },
          (error) => {
            this.snackBar.open('Error loading items', 'Close', {
              duration: 2000,
            });
            this.isLoading = false;
            // this.error = true;
          }
        );
      } else if (params['category']) {
        this.category = params['category'];
        this.loadData();
      }
    });
  }

  onItemClick(item: any) {
    this.itemClicked.emit(item);
  }

  loadData(): void {
    if (this.category === 'all') {
      this.apiService.getAllItems().subscribe(
        (items: any) => {
          this.items = this.utilsService.processItems(items);
          this.isLoading = false;
        },
        (error) => {
          this.snackBar.open('Error loading items', 'Close', {
            duration: 2000,
          });
          this.isLoading = false;
          this.error = true;
        }
      );
    } else {
      this.apiService.getItemsCategory(this.category).subscribe(
        (items: any) => {
          this.items = this.utilsService.processItems(items);
          this.isLoading = false;
        },
        (error) => {
          this.snackBar.open('Error loading items', 'Close', {
            duration: 2000,
          });
          this.isLoading = false;
          this.error = true;
        }
      );
    }
  }
}
