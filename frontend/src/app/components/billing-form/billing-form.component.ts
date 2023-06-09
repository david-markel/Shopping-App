import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
})
export class BillingFormComponent implements OnInit {
  billingForm: FormGroup;

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
      zipCode: ['', Validators.required],
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

  ngOnInit(): void {}

  onSubmit() {
    if (this.billingForm.valid) {
      console.log('Billing form submitted:', this.billingForm.value);
      this.formSubmitted.emit(this.billingForm.value);
    } else {
      console.log('Billing form is invalid');
    }
  }
}
