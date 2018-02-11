import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserSessionService } from '../_services/user-session.service';
import { EmployerService } from '../../secure/_services/http/employer.service';

import { Employer } from '../_models/employer.model';

@Injectable()
export class EmployersResolve implements Resolve<Employer[]> {

  constructor(private userSession: UserSessionService, private employerService: EmployerService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.employerService.getEmployers(this.userSession.getToken());
  }
}
