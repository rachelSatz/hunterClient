import { EmployeeFeedback } from '../_models/employee-feedback.model';
import { Select2OptionData } from 'ng2-select2';
import { PaginationData } from '../data-table/classes/pagination-data';

export interface EmployeeFeedbackData {
    feedbacks: EmployeeFeedback[];
    products: Select2OptionData[];
    manufacturers: Select2OptionData[];
    statuses: Select2OptionData[];
    paginationData: PaginationData;
    employees: Select2OptionData[];
}
