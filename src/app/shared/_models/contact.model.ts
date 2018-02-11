export class Contact {
  id: number;
  entityID: number;
  entityType: EntityTypes;
  firstName: string;
  lastName: string;
  phone: string;
  mobile: string;
  email: string;
  role: string;
}

export enum EntityTypes {
  Employer = 0,
  Agent = 1,
  Manufacturer = 3
}
