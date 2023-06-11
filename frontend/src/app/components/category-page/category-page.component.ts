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
  footerHeight = 200;
  topOffset = this.navbarHeight;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY >= this.navbarHeight) {
      this.topOffset = 0;
    } else {
      this.topOffset = this.navbarHeight - scrollY;
    }

    if (scrollY + viewportHeight >= documentHeight - this.footerHeight) {
      this.topOffset = Math.min(
        this.topOffset,
        documentHeight - scrollY - viewportHeight - this.footerHeight
      );
    }
  }
}
