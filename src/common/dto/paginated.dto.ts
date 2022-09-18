export interface PaginateMeta {
  totalItems: number;
  itemCount: number;
  itemPerPage: number;
  totalPages: number;
  currentPage: number;
}
export class PaginateDto<TData> {
  items: TData[];
  meta: PaginateMeta;
}
