// account.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/interfaces';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
