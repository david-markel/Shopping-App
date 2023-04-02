import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {
  selectedItem: any;

  onItemSelected(item: any) {
    this.selectedItem = item;
  }

  navbarHeight = 146;
  topOffset = this.navbarHeight;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    this.topOffset = scrollY >= this.navbarHeight ? 0 : this.navbarHeight;
  }
}
