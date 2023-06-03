// account.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, RegisterResponse } from '../../models/interfaces';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  states = ['Alabama', 'Alaska', 'Arizona' /*...other states*/];
  countries = ['United States', 'Canada', 'Mexico' /*...other countries*/];

  user: User = {} as User;

  isAuthenticated$ = this.authService.isAuthenticated;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  updateAccount() {
    const dialogRef = this.dialog.open(PasswordDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService
          .updateAccount(this.user)
          .pipe(
            tap((response: RegisterResponse) => {
              if (response.success) {
                this.router.navigate(['/']);
              }
            })
          )
          .subscribe();
      }
    });
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(PasswordDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService
          .deleteAccount(this.user.id)
          .subscribe(() => this.router.navigate(['/']));
      }
    });
  }
}
