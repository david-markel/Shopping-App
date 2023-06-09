import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/interfaces';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
})
export class BillingFormComponent implements OnInit {
  billingForm: FormGroup;

  @Input() user: User = {} as User;
  @Output() formSubmitted = new EventEmitter<any>();

  states = ['Alabama', 'Alaska', 'Arizona' /* ...other states... */];
  countries = ['United States'];

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardExpiry: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/),
        ],
      ],
      cardCVV: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  ngOnInit(): void {
    if (this.user) {
      console.log('user: ', this.user);
      this.billingForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        address1: this.user.address.address1,
        address2: this.user.address.address2,
        city: this.user.address.city,
        state: this.user.address.state,
        zipcode: this.user.address.zipcode,
        country: this.user.address.country,
      });
    }
  }

  onSubmit() {
    if (this.billingForm.valid) {
      console.log('Billing form submitted:', this.billingForm.value);
      this.formSubmitted.emit(this.billingForm.value);
    } else {
      console.log('Billing form is invalid');
    }
  }
}
