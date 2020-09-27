import { SeoService } from '@services/seo.service';
import { FORM_STATUS } from './../../../constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '@services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  formStatus = FORM_STATUS;

  constructor(
    private formBuilder: FormBuilder,
    private contactUsService: ContactUsService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setTitle('eboves - Contact Us');
    this.contactUsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^03[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

    this.contactUsService.bindFormStatus(this.contactUsForm.statusChanges);
    this.contactUsService.bindFormValues(this.contactUsForm.valueChanges);
  }

  contactUs() {
    this.contactUsService.contactUs();
  }

  get name() {
    return this.contactUsForm.get('name');
  }

  get phone() {
    return this.contactUsForm.get('phone');
  }

  get email() {
    return this.contactUsForm.get('email');
  }

  get subject() {
    return this.contactUsForm.get('subject');
  }

  get message() {
    return this.contactUsForm.get('message');
  }
}
