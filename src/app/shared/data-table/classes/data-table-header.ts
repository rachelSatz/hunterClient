import { DataTableSelectCriteria } from './data-table-select-criteria';

export interface DataTableHeader {
  column: string;
  label: string;
  type?: string;
  selectCriteria?: DataTableSelectCriteria[];
}
