import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  performSearch() {
    if (this.searchQuery) {
      this.router.navigate(['/search', this.searchQuery]);
    }
  }
}
