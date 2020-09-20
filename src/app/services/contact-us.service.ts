import { NotificationsService } from './notifications.service';
import { catchError } from 'rxjs/operators';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';
import { FORM_STATUS } from './../../constants';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ContactUsForm } from '@models/contact-us-form.model';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private formStatus$ = new BehaviorSubject<string>(FORM_STATUS.INVALID);
  formStatus: Observable<string> = this.formStatus$.asObservable();

  private formValues$ = new BehaviorSubject<ContactUsForm>({});
  formValues: Observable<ContactUsForm> = this.formValues$.asObservable();

  constructor(
    private client: HttpClient,
    private notificationService: NotificationsService
  ) {}

  bindFormStatus(formStatus: Observable<string>) {
    formStatus.subscribe(this.formStatus$);
  }

  bindFormValues(formValues: Observable<ContactUsForm>) {
    formValues.subscribe(this.formValues$);
  }

  contactUs() {
    const formData = this.formValues$.value;
    this.client
      .post(`${environment.apiUrl}contact-us`, formData)
      .pipe(
        catchError(() => {
          this.notificationService.notify(
            NotificationsService.Type.ERROR,
            'Could not process your request. Try Again Later!'
          );
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.notificationService.notify(
          NotificationsService.Type.SUCCESS,
          `Thank you for contacting us. We'll get back to you shortly`
        );
      });
  }
}
