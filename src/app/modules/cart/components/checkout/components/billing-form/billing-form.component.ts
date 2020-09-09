import { CartService } from '@services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
})
export class BillingFormComponent implements OnInit {
  billingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.billingForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^03[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      addressLineOne: ['', [Validators.required]],
      addressLineTwo: '',
      city: ['', [Validators.required]],
    });

    this.cartService.bindFormStatus(this.billingForm.statusChanges);
    this.cartService.bindFormValues(this.billingForm.valueChanges);
  }

  get firstName() {
    return this.billingForm.get('firstName');
  }

  get lastName() {
    return this.billingForm.get('lastName');
  }

  get phone() {
    return this.billingForm.get('phone');
  }

  get email() {
    return this.billingForm.get('email');
  }

  get addressLineOne() {
    return this.billingForm.get('addressLineOne');
  }

  get city() {
    return this.billingForm.get('city');
  }
}
