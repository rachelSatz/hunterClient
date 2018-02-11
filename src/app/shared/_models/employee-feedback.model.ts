import { Employee } from './employee.model';
import {RecordStatus} from './record-status.model';
import {Product} from "./product.model";
import {Process} from "./process.model";
import {ProductEmployer} from "./product-employer.model";
import {EmployeePayment} from "./employee-payment.model";

export class EmployeeFeedback extends EmployeePayment {

  static statusLabel = new Map([[0, 'ללא מענה'], [1, 'תקין'], [2, 'בטיפול'], [3, 'שגיאה'], [4, 'בעיה']]);

  static productTypeLabel = new Map ([[0, 'אחר'], [1, 'קרן פנסיה'], [2, 'קופת גמל'],
  [3, 'ביטוח מנהלים'], [4, 'ביטוח בריאות'], [5, 'פוליסת חיסכון טהור'], [6, 'פוליסת סיכון טהור']]);
/*
    id: number;
    employee: Employee;
    sum: number;
    status: 'failed' | 'partial' | 'successful';
    salary: number;
    fitnessLoss: number;
    employeePart: number;
    employerPart: number;
    compensation: number;
    errors: [{}];


    uplodefile: Process;
    product: Product;
    productEmployer: ProductEmployer;


  status: number;
  recordStatus: RecordStatus[];



    labels = {
      status: { failed: 'לא נפרעו', partial: 'נפרעו חלקית', successful: 'נפרעו' }
    };*/

  status: number;
  recordStatus: RecordStatus[];

  getStatusLabels(label: string, type?: 'key' | 'value'): string {
    // debugger;
    //  if (type === 'key') {
    //    return this.labels.status[label];
    //  }
    //
    //  for (const i in this.labels.status) {
    //    if (label === this.labels.status[i]) {
    //      return i;
    //    }
    //  }

     return "";

  }
}
