import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EmployersResolve } from '../_resolves/employers.resolve';

import { PaginationComponent } from './pagination/pagination.component';
import { DataTableComponent } from './data-table.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [EmployersResolve],
  declarations: [DataTableComponent, PaginationComponent],
  exports: [DataTableComponent, PaginationComponent]
})
export class DataTableModule {}
