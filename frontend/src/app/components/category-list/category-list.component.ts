import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ItemService } from 'src/app/services/item-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  jsonData: any;
  category: string = 'movies';
  @Output() itemClicked = new EventEmitter<any>();

onItemClick(item: any) {
  console.log("Emitting itemClicked event in CategoryListComponent");
  this.itemClicked.emit(item);
  console.log("CLICKED IN category", item);
}
  

  constructor(private itemService: ItemService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => { // Change to this.route.params.subscribe
      console.log('Route parameters changed:', params);
      this.category = params['category']; // Access the value with params['category']
      this.loadData();
    });
  }

  loadData(): void {
    const fileName = `${this.category}.json`; // Use the category as part of the file name
    this.itemService.readJSONFile(fileName).subscribe(
      (result: any) => {
        this.jsonData = result;
        this.jsonData[this.category] = this.jsonData[this.category].map((item: any) => {
          return {
            ...item,
            imageSrc: '../../../assets/items/' + item.imageSrc,
          };
        });
        console.log('Data:', this.jsonData);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
