import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  @Input() selectedItem: any;
  @Output() closeButtonClick = new EventEmitter<void>();
  
  rating: number = 0;
  filledStars: number[] = [];
  emptyStars: number[] = [];

  onCloseButtonClick() {
    this.closeButtonClick.emit();
  }

  ngOnInit() {
    this.rating = this.randomRating();
    this.updateStars();
  }

  randomRating(): number {
    return 1 + Math.random() * 4;
  }

  updateStars() {
    const roundedRating = Math.round(this.rating);
    this.filledStars = Array(roundedRating).fill(0);
    this.emptyStars = Array(5 - roundedRating).fill(0);
  }

  constructor() {}
}
