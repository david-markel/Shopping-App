// account.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: any = {
    name: '',
    username: '',
    email: '',
    address: '',
    subscription: 'Basic',
  };

  constructor() { }

  ngOnInit(): void {
  }
}
