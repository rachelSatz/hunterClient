import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Employer } from '../../shared/_models/employer.model';
import { Process } from '../../shared/_models/process.model';
import { ProcessDetails } from '../../shared/_models/process-details.model';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  @ViewChild('stepper') stepper;

  isNew = true;

  process = <Process>{ employer: <Employer>{}, year: new Date().getFullYear(), details: new ProcessDetails() };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.isNew = false;
      this.process = this.route.snapshot.data['process'].data.process;
      this.stepper.selectedIndex = 1;


      this.stepper.selectedIndex = (+this.process.stepStatus === 1) ? 2 : 1;
    }
  }

  setStep(values: { index: number, process: Process }) {
    this.process = values.process;
    this.stepper.selectedIndex = values.index;
  }
}
