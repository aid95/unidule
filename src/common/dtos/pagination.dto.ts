import { IsNumber } from 'class-validator';

export class PaginationRequestDTO {
  @IsNumber()
  offset: number;

  @IsNumber()
  limit: number;
}

export class PaginationResponseDTO<T> {
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

  constructor(totalCount: number, offset: number, limit: number) {
    this.totalCount = totalCount;
    this.pageSize = Page.calcPageSize(offset, limit);
    this.totalPage = Math.ceil(totalCount / this.pageSize);
  }

  private static calcPageSize(offset: number, limit: number) {
    return Math.abs(offset - limit);
  }
}
