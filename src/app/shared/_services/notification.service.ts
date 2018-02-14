import { Injectable } from '@angular/core';

declare let swal: any;

@Injectable()
export class NotificationService {

  showResult(message: string, type: 'success' | 'error' | 'info', title?: string): void {

    if (!title) {
      title = type === 'success' ? 'בוצע בהצלחה' : 'אירעה שגיאה';
    }

    const options = {
      title: title,
      text: message,
      type: type === 'success' ? 'success' : 'error',
      confirmButtonText: 'אישור',
      buttonsStyling: false,
      confirmButtonClass: type === 'success' ? 'btn btn-success' : 'btn btn-danger'
    };

    swal(options);
  }
}
export const enum NotificationType {
  success = 'success',
  error = 'error',
  info = 'info'
}
