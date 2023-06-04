import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit, OnChanges {
  @Input() selectedItem: any;
  @Output() closeButtonClick = new EventEmitter<void>();

  rating: number = 0;
  filledStars: number[] = [];
  emptyStars: number[] = [];

  onCloseButtonClick() {
    this.closeButtonClick.emit();
  }

  ngOnInit() {
    console.log('Selected Item:', this.selectedItem);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItem']) {
      this.rating = this.selectedItem?.rating || 0;
      this.updateStars();
    }
  }

  updateStars() {
    const roundedRating = Math.round(this.rating);
    this.filledStars = Array(roundedRating).fill(0);
    this.emptyStars = Array(5 - roundedRating).fill(0);
  }

  constructor() {}
}
