import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ProcessService } from '../_services/http/process.service';

import { Process } from '../_models/process.model';

@Injectable()
export class ProcessResolve implements Resolve<Process> {

  constructor(private processService: ProcessService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.processService.getProcess(+route.paramMap.get('id'));
  }
}
