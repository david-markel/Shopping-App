import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service'; // adjust this import
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
})
export class PasswordDialogComponent {
  password!: string;
  isChecking = false;

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
    if (this.password) {
      // get the current user from AuthService
      this.authService.user.pipe(take(1)).subscribe((currentUser) => {
        if (currentUser) {
          // validate password
          this.authService
            .validatePassword(currentUser.id, this.password)
            .subscribe((response) => {
              if (response.success) {
                console.log('RIGHT');
                this.snackBar.open(
                  'Succesfully updated account information!',
                  'Close',
                  {
                    duration: 3000, // the snackbar automatically closes after 3 seconds
                  }
                );
                // if password is correct, close the dialog and pass the password to the parent component
                this.dialogRef.close(this.password);
              } else {
                console.log('WRONG');
                // if password is incorrect, show an error message
                this.snackBar.open('Password incorrect', 'Close', {
                  duration: 3000, // the snackbar automatically closes after 3 seconds
                });
              }
            });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
