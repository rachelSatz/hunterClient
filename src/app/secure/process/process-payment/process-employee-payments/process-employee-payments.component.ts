import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Select2OptionData } from 'ng2-select2';

import { DataTableComponent } from '../../../../shared/data-table/data-table.component';

import { ProcessService } from '../../../../shared/_services/http/process.service';

import { Select2Options } from '../../../../shared/_const/select2-options';
import { Product } from '../../../../shared/_models/product.model';
import { EmployeePayment } from '../../../../shared/_models/employee-payment.model';
import { Process } from '../../../../shared/_models/process.model';
import { productTypeLable, StatusDepositLable, SugTakbulLabel } from '../../../../shared/_const/EnumLabels';

@Component({
  selector: 'app-process-employee-payments',
  templateUrl: './process-employee-payments.component.html',
  styleUrls: ['../../../../shared/data-table/data-table.component.css']
})
export class ProcessEmployeePaymentsComponent extends DataTableComponent implements OnInit {

  select2Options: Select2Options;

  product = new Product;
  payment = new EmployeePayment;

  showFields = {};
  products: Select2OptionData[] = [];
  employees: Select2OptionData[] = [];

  filters: { id: number, text: string }[] = [];
  activeFilter: 'productID' | 'employeeID';

  isLoadingData = false;

  constructor(@Inject(MAT_DIALOG_DATA) public process: Process, protected route: ActivatedRoute,
              private processService: ProcessService) {
    super(route);
  }

  ngOnInit() {
    this.searchCriteria['processID'] = this.process.id;
    this.fetchItems();
  }

  fetchItems(): void {
    this.isSearching = true;
    this.processService.getEmployeePayments(this.searchCriteria).then(response => {
      this.setItems(response);
      this.isSearching = false;
    });
  }

  setItems(response: Object): void {
    this.isSearching = false;

    this.isLoadingData = true;

    this.items = response['listPayment'];
    this.showFields = response['listShow'];

    if (this.activeFilter !== 'productID') {
      this.products = this.setProductSelect2Data(response['listProduct']);
    }

    if (this.activeFilter !== 'employeeID') {
      this.employees = this.setEmployeeSelect2Data(response['listEmployee']);
    }

    this.filters = response['ActionFilters'];

    this.paginationData.totalItems = this.items.length;
    this.paginateItems();

    setTimeout(() => this.isLoadingData = false, 0);
  }

  private setProductSelect2Data(values: Object[]): Select2OptionData[] {

    const data = [
      { id: '0', text: 'בחר קופה' }
    ];

    for (let i = 0; i < values.length; i++) {
      data[i + 1] = { id: values[i]['id'], text: values[i]['name'] };
    }

    return data;
  }

  private setEmployeeSelect2Data(values: Object[]): Select2OptionData[] {
    const data = [
      { id: '0', text: 'בחר עובד' }
    ];

    for (let i = 0; i < values.length; i++) {
      data[i + 1] = { id: values[i]['id'], text: values[i]['firstName'] + ' ' + values[i]['lastName'] };
    }

    return data;
  }

  setSearch(name: 'productID' | 'employeeID', value: number): void {

    this.activeFilter = name;

    if (this.isLoadingData) {
      return;
    }

    this.searchCriteria[name] = value;
    this.search();
  }

  getSugTakbulLabel(key: number): string {
    return SugTakbulLabel.get(key);
  }
  getStatusDepositLable(key: number): string {
    return StatusDepositLable.get(key);
  }
  getProductTypeLable(key: number): string {
    return productTypeLable.get(key);
  }
}
