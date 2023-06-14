import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        if (response.auth === true) {
          // successful login
          this.snackBar.open('Successfully logged in!', 'Close', {
            duration: 3000,
          });
          // navigate to home page
          this.router.navigate(['/']);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.snackBar.open(
            'Invalid credentials. Please check your email and password.',
            'Close',
            {
              duration: 3000,
            }
          );
        } else {
          this.snackBar.open(
            'An error occurred. Please try again later.',
            'Close',
            {
              duration: 3000,
            }
          );
        }
        console.error(error);
      }
    );
  }
}
