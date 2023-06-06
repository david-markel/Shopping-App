import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';
import { ItemData } from '../../models/interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() props: ItemData = {
    imageSrc: '',
    title: '',
    description: '',
    price: 0,
    rating: 0,
    id: '',
    collection: '',
  };
}
