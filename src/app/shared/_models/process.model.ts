import { Employer } from './employer.model';
import { ProcessDetails } from './process-details.model';

export class Process {
  id: number;
  addToProcessName?: string;
  employer: Employer;
  month: number;
  year: number;
  totalPaymentFile?: number;
  codeFile?: 'positive' | 'negative';
  details: ProcessDetails;
  stepStatus: StepStatus;
  validityStatus : ValidityStatus;
  fileName: string;
  processKind: number;
  errorMessage: string;
  KodSochnut: number;
  labels = {
    stepStatus: {
      error:'שגיאה בשידור נתונים',
      transmitted:'שודר',
      partiallyTransmitted:'שודר חלקית',
      notTransmitted: 'לא שודר',
    },
    validityStatus: {
      Invalid_file: 'קובץ לא חוקי',
      Waiting_for_treatment: 'ממתין לטיפול',
      Collection: 'גבייה',
      Finish: 'קובץ מעובד',
      problem: 'קיימת בעיה בסכומים',
      Error: 'שגיאה',
      NotRelevant: 'לא רלוונטי',
    }
  };

  constructor() {
    this.employer = new Employer();
    this.codeFile = 'positive';
  }
}

export enum StepStatus {
  error = -1,
  transmitted = 0,
  partiallyTransmitted = 1,
  notTransmitted = 2,
}

export enum ValidityStatus {
  Invalid_file = -1,
  Waiting_for_treatment = 0,
  Collection = 1,
  Finish = 2,
  problem = 3,
  Error = 4,
  NotRelevant = 5,
}
