export class PaginationData {
  totalPages: number;
  totalItems: number;
  limit: number;
  currentPage: number;

  constructor(limit?: number) {
    this.limit = limit ? limit : 30;
  }
}
