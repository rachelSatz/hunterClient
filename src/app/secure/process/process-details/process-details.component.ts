import { Component, Input } from '@angular/core';

import { Process } from '../../../shared/_models/process.model';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html'
})
export class ProcessDetailsComponent {
  @Input() process: Process;
  @Input() mode: 'payment' | 'transmission';
}
