import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private notifier: NotifierService) {}

  notify(type: NotificationsService.Type, message: string) {
    this.notifier.notify(type, message);
  }
}

export namespace NotificationsService {
  export enum Type {
    SUCCESS = 'success',
    ERROR = 'error',
  }
}
