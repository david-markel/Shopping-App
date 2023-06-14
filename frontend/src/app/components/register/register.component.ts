import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      (response) => {
        if (response.success) {
          // successful registration
          this.snackBar.open('Successfully registered!', 'Close', {
            duration: 3000,
          });
          // navigate to home page
          this.router.navigate(['/']);
        }
      },
      (error) => {
        let errorMessage = 'An error occurred. Please try again later.';
        if (error.status === 400) {
          errorMessage = 'Missing required fields.';
        } else if (error.status === 409) {
          errorMessage = 'Email already exists.';
        }

        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
        });

        console.error(error);
      }
    );
  }
}
