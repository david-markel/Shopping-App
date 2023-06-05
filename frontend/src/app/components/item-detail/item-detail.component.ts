import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  user: User = {} as User;

  onCloseButtonClick() {
    this.closeButtonClick.emit();
  }

  isAuthenticated$ = this.authService.isAuthenticated;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
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

  addToCart() {
    this.apiService.addToCart(this.user, this.selectedItem._id).subscribe(
      (res) => {
        if (res.success) {
          this.snackBar.open('Added to cart!', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Failed to add to cart', 'Close', {
            duration: 3000,
          });
        }
      },
      (err) => console.error('Error: ', err)
    );
  }
}
