import { Injectable } from '@angular/core';

declare var swal: any;

@Injectable()
export class NotificationService {
// type :
// success : 0
// error: 1
// info: 2
  showResult(message: string, type: number): void {
    if (type === 0) {
      swal({
        title: 'בוצע בהצלחה',
        text: message,
        // type: 'success',
        confirmButtonText: 'אישור',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success'
      });
    }
    else if(type === 1) {
      swal({
        title: 'אירעה שגיאה',
        text: message,
        //type: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'אישור',
        confirmButtonClass: 'btn btn-warning'
      });
    }
  }

  showResultHTML(message: string, type: MessageType): void {
    if (type === 0) {
      swal({
        title: 'בוצע בהצלחה',
        html: message,
        // type: 'success',
        confirmButtonText: 'אישור',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success'
      });
    }
    else if (type === 1) {
      swal({
        title: 'אירעה שגיאה',
        html: message,
        //type: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'אישור',
        confirmButtonClass: 'btn btn-warning'
      });
    }
  }
}
export const enum MessageType {
  Success = 0,
  Error = 1,
  Info = 2
}
