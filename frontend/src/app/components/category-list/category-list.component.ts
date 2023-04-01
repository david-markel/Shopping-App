import { Component } from '@angular/core';
import { ItemService } from 'src/app/services/item-service.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  jsonData: any;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    const fileName = 'movies.json'; // Replace with your JSON file name
    this.itemService.readJSONFile(fileName).subscribe(
      (result: any) => {
        this.jsonData = result;
        this.jsonData.furniture = this.jsonData.movies.map((item: any) => {
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
