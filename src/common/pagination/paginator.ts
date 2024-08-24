import { Expose } from 'class-transformer';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginateOptions {
  limit?: number;
  page?: number;
  total?: boolean;
}

export class PaginationResult<T> {
  constructor(partial: Partial<PaginationResult<T>>) {
    Object.assign(this, partial);
  }

  @Expose()
  page: number;
  @Expose()
  limit: number;
  @Expose()
  total?: number;
  @Expose()
  totalPage?: number;
  @Expose()
  data: T[];
}

export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  options: PaginateOptions = {
    limit: 10,
    page: 1,
    total: true,
  },
  cbTransformData: any,
): Promise<PaginationResult<T>> {
  const offset = (options.page - 1) * options.limit;
  const [data, total] = await Promise.all([
    qb.limit(options.limit).offset(offset).getMany(),
    qb.getCount(),
  ]);

  return new PaginationResult({
    page: options.page,
    limit: options.limit,
    total,
    totalPage: Math.ceil(total / options.limit),
    data: cbTransformData ? await cbTransformData(data) : data,
  });
}
