import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent {
  @Input() selectedItem: any;
  @Output() closeButtonClick = new EventEmitter<void>();

  onCloseButtonClick() {
    this.closeButtonClick.emit();
  }

  constructor() {}
  
}
