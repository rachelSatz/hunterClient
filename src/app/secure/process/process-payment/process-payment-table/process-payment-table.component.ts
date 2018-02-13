import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTableComponent } from '../../../../shared/data-table/data-table.component';

import { ProcessService } from '../../../../shared/_services/http/process.service';

import { payTypeLabel, productTypeLabel, SentToSafeBoxes } from '../../../../shared/_const/EnumLabels';
import { Process } from '../../../../shared/_models/process.model';

@Component({
  selector: 'app-process-payment-table',
  templateUrl: './process-payment-table.component.html',
  styleUrls: ['../../../../shared/data-table/data-table.component.css', './process-payment-table.component.css']
})
export class ProcessPaymentTableComponent extends DataTableComponent {

  public isLoading = false;

  process: Process;

  constructor(protected route: ActivatedRoute, private processService: ProcessService) {
    super(route);
  }

  fetchItems(): void {
    this.isLoading = true;

    this.process = this.route.parent.snapshot.data['process'].data.process;

    this.processService.loadTransmissionTableData(this.process.id).then(response => {
      this.setItems(response['data']);
      this.isLoading = false;
    });
  }

  getproductTypeLabel(key: number): string {
    return productTypeLabel.get(key);
  }

  getPayTypeLabel(key: number): string {
    return payTypeLabel.get(key);
  }

  getSentToSafeBoxesLabel(key: number): string {
    return SentToSafeBoxes.get(key);
  }
}
