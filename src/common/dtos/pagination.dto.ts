export class PaginationDTO<T> {
  items: T[];
  page: Page;

  constructor(items: T[], page: Page) {
    this.items = items;
    this.page = page;
  }
}

export class Page {
  totalCount: number;
  pageSize: number;
  totalPage: number;

  constructor(totalCount: number, pageSize: number) {
    this.totalCount = totalCount;
    this.pageSize = pageSize;
    this.totalPage = Math.ceil(totalCount / pageSize);
  }
}
