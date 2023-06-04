import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent {
  selectedItem: any;
  isSearchRoute: boolean = false;

  constructor(private router: Router) {
    // Update 'isSearchRoute' every time the route changes
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isSearchRoute = val.url.includes('/search');
      }
    });
  }

  onItemSelected(item: any) {
    this.selectedItem = item;
  }

  navbarHeight = 146;
  topOffset = this.navbarHeight;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    this.topOffset = scrollY >= this.navbarHeight ? 0 : this.navbarHeight;
  }
}
