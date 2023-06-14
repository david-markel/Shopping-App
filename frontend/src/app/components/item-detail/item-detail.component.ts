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

  isAuthenticated = false;

  onCloseButtonClick() {
    this.closeButtonClick.emit();
  }

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
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
    if (!this.isAuthenticated) {
      this.snackBar.open('Please sign in to add items to the cart', 'Close', {
        duration: 3000,
      });
      return;
    }

    const { _id, collectionName } = this.selectedItem;
    this.apiService.addToCart(this.user, _id, { collectionName }).subscribe(
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
      (err) =>
        this.snackBar.open('An error occurred. Please try again.', 'Close', {
          duration: 3000,
        })
    );
  }
}
