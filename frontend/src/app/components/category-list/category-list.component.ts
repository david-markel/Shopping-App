import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'; // Import the new ApiService
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  items: any[] = []; // This will hold the items fetched from the backend
  category: string = 'movies';
  @Output() itemClicked = new EventEmitter<any>();

  onItemClick(item: any) {
    this.itemClicked.emit(item);
  }

  constructor(private apiService: ApiService, private route: ActivatedRoute) {} // Inject the new ApiService

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.loadData();
    });
  }

  loadData(): void {
    // Call the getItemsCategory() method of the new ApiService
    this.apiService.getItemsCategory(this.category).subscribe(
      (items: any) => {
        // The server sends back an array of items, so we don't need to do this.jsonData[this.category]
        this.items = items.map((item: any) => {
          return {
            ...item,
            // If your server returns the imageSrc field as a relative URL, you might need to adjust this
            imageSrc: '../../../assets/items/' + item.imageSrc,
          };
        });
        console.log('Data:', this.items);
      },
      (error) => {
        // console.error('Error:', error);
      }
    );
  }
}
