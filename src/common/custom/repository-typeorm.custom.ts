import { QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';

//Declaration Merging Of Module.
declare module 'typeorm' {
  interface Repository<Entity> {
    fCreateFilterBuilder<TQuery>(
      alias?: string,
      query?: TQuery,
      queryRunner?: QueryRunner,
    ): SelectQueryBuilder<Entity>;
  }
}

Repository.prototype.fCreateFilterBuilder = function (
  alias,
  query,
  queryRunner,
) {
  return this.createQueryBuilder(alias, queryRunner).fCreateFilterBuilder(
    alias,
    query,
  );
};
