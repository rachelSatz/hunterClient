import { Employer } from './employer.model';

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  identityNumber: string;
  phone: string;
  mobile: string;
  email: string;
  address: string;
  employer: Employer;

  constructor() {
    this.employer = new Employer;
  }
}
