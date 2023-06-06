import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  processItems(items: any[]) {
    return items.map((item) => {
      return {
        ...item,
        imageSrc: '../../../assets/items/' + item.imageSrc,
      };
    });
  }
}
