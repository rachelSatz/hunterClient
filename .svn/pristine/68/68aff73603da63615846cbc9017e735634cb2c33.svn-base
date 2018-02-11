import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PaginationData } from '../../_models/pagination-data.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [ './pagination.component.css']
})
export class PaginationComponent {

  @Input() data: PaginationData = <PaginationData>{ currentPage: 1, limit: 10 };
  @Output() isLinkClicked = new EventEmitter<boolean>();

  getMaxShownItems(): number {
	  const max = this.data.currentPage * this.data.limit;

	  if (this.data.totalItems < max) {
	    return this.data.totalItems;
    }

	  return max;
  }

  getUrl(): any {
    if (this.data.url === false) {
      return [];
    }

    return this.data.url ? this.data.url : './';
  }

  linkClicked(): void {
    this.isLinkClicked.emit(true);
  }
}
