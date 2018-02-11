import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserSessionService } from '../_services/user-session.service';
import { ProcessService } from '../../secure/_services/http/process.service';

import { Process } from '../_models/process.model';

@Injectable()
export class ProcessResolve implements Resolve<Process> {

  constructor(private userSession: UserSessionService, private processService: ProcessService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.processService.getProcess(+route.paramMap.get('id'), this.userSession.getToken());
  }
}
