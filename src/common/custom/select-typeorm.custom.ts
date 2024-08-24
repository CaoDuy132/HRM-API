import { ObjectLiteral } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { PaginationOptions } from '../base';

//Declaration Merging Of Module.
declare module 'typeorm/query-builder/SelectQueryBuilder' {
  interface SelectQueryBuilder<
    Entity,
    TQuery extends Partial<PaginationOptions & Entity> = Partial<
      PaginationOptions & Entity
    >,
  > {
    count: number;
    query: TQuery;
    entityName: string;
    fCreateFilterBuilder(alias: string, query?: TQuery): this;
    fGetParam(): string;
    fLeftJoinAndSelect<EntityRelation = Entity>(
      property: string,
      alias: string,
      selectFields?: (keyof EntityRelation)[],
      condition?: string,
      parameters?: ObjectLiteral,
    ): this;

    fInnerJoinAndSelect<EntityRelation = Entity>(
      property: string,
      alias: string,
      selectFields?: (keyof EntityRelation)[],
      condition?: string,
      parameters?: ObjectLiteral,
    ): this;

    fAddSelect<EntityRelation = Entity>(
      alias: string,
      selectFields: (keyof EntityRelation)[],
    ): this;

    fAndWhere<EntityRelation = Entity, ValueType = string>(
      name: keyof EntityRelation,
      cValue?: ValueType,
      entityName?: string,
    ): this;

    fAndWhereNot<EntityRelation = Entity, ValueType = string>(
      name: keyof EntityRelation,
      cValue?: ValueType,
      entityName?: string,
    ): this;
    fAndWhereIn<EntityRelation = Entity, ValueType = string>(
      name: keyof EntityRelation,
      array: ValueType[],
      entityName?: string,
    ): this;

    fAndWhereNotIn<EntityRelation = Entity, ValueType = string>(
      name: keyof EntityRelation,
      array: ValueType[],
      entityName?: string,
    ): this;
    fAndWhereLikeString<EntityRelation = Entity>(
      name: keyof EntityRelation,
      valueString?: string,
      entityName?: string,
    ): this;

    fAndWhereDate<EntityRelation = Entity, ValueType = number>(
      columnName: keyof EntityRelation,
      startValue?: ValueType,
      endValue?: ValueType,
      entityName?: string,
    ): this;

    fAndWhereGt<EntityRelation = Entity, ValueType = number>(
      columnName: keyof EntityRelation,
      startValue?: ValueType,
      entityName?: string,
    ): this;
    fAndWhereLt<EntityRelation = Entity, ValueType = number>(
      columnName: keyof EntityRelation,
      endValue?: ValueType,
      entityName?: string,
    ): this;
    fAndWhereGte<EntityRelation = Entity, ValueType = number>(
      columnName: keyof EntityRelation,
      startValue?: ValueType,
      entityName?: string,
    ): this;
    fAndWhereLte<EntityRelation = Entity, ValueType = number>(
      columnName: keyof EntityRelation,
      startValue?: ValueType,
      entityName?: string,
    ): this;

    fAddPagination(page?: number, perPage?: number, getFull?: boolean): this;
    fOrderBy<EntityRelation = Entity>(
      name: keyof EntityRelation,
      order?: 'DESC' | 'ASC',
      entityName?: string,
    ): this;

    fAddOrderBy<EntityRelation = Entity>(
      name: keyof EntityRelation,
      order?: 'DESC' | 'ASC',
      entityName?: string,
    ): this;
    fAndWhereJsonb<EntityRelation = Entity, ValueType = string>(
      name: keyof EntityRelation,
      propertyJsonName: string,
      cValue: ValueType,
      entityName?: string,
    ): this;

    fAndWhereUnAccentStringJsonb<EntityRelation = Entity>(
      name: keyof EntityRelation,
      propertyJsonName: string,
      valueString: string,
      entityName?: string,
    ): this;

    fAndWhereDateJsonb<EntityRelation = Entity, ValueType = number>(
      name: keyof EntityRelation,
      propertyJsonName: string,
      startValue: ValueType,
      endValue: ValueType,
      entityName?: string,
    ): this;

    fAndWhereNull<EntityRelation = Entity>(
      name: keyof EntityRelation,
      cValue: boolean,
      entityName?: string,
    ): this;
  }
}
SelectQueryBuilder.prototype.fCreateFilterBuilder = function (alias, query) {
  this.entityName = alias;
  this.count = 0;
  this.query = query || {};
  return this;
};
SelectQueryBuilder.prototype.fLeftJoinAndSelect = function (
  property,
  alias,
  selectFields,
  condition,
  parameters,
) {
  this.leftJoin(property, alias, condition, parameters);
  this.fAddSelect(alias, selectFields);
  return this;
};

SelectQueryBuilder.prototype.fAddSelect = function (alias, selectFields) {
  const selection = selectFields?.length
    ? selectFields.map((field) => `${alias}.${field as string}`)
    : [alias];
  this.addSelect(selection);
  return this;
};
SelectQueryBuilder.prototype.fGetParam = function () {
  return '_' + String(this.count++);
};

SelectQueryBuilder.prototype.fAndWhere = function (name, cValue, entityName) {
  const propertyName = String(name);
  const paramsName = this.fGetParam();
  const value = arguments.length === 1 ? this.query[name] : cValue;
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;
  if (value) {
    this.andWhere(`${conditionColumn} =  :${paramsName}`, {
      [paramsName]: value,
    });
  }
  return this;
};

SelectQueryBuilder.prototype.fAndWhereNot = function (
  name,
  cValue,
  entityName,
) {
  const propertyName = String(name);
  const paramsName = this.fGetParam();
  const value = arguments.length === 1 ? this.query[name] : cValue;
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (value) {
    this.andWhere(`${conditionColumn} !=  :${paramsName}`, {
      [paramsName]: value,
    });
  }
  return this;
};

SelectQueryBuilder.prototype.fAndWhereIn = function (name, array, entityName) {
  const propertyName = String(name);
  const paramsName = this.fGetParam();
  const value = arguments.length === 1 ? this.query[name] : array;
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;
  if (array.length > 0) {
    this.andWhere(`${conditionColumn} IN (:...${paramsName})`, {
      [paramsName]: value,
    });
  }
  return this;
};

SelectQueryBuilder.prototype.fAndWhereNotIn = function (
  name,
  array,
  entityName,
) {
  const propertyName = String(name);
  const paramsName = this.fGetParam();
  const value = arguments.length === 1 ? this.query[name] : array;
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;
  if (array.length > 0) {
    this.andWhere(`${conditionColumn} NOT IN (:...${paramsName})`, {
      [paramsName]: value,
    });
  }
  return this;
};

SelectQueryBuilder.prototype.fAndWhereLikeString = function (
  name,
  valueString,
  entityName,
) {
  const propertyName = String(name);
  const paramsName = this.fGetParam();
  const value = arguments.length === 1 ? this.query[name] : valueString;
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (value) {
    this.andWhere(`${conditionColumn} LIKE :${paramsName}`, {
      [paramsName]: `%${value}%`,
    });
  }
  return this;
};

SelectQueryBuilder.prototype.fAndWhereDate = function <
  EntityRelation,
  ValueType = number,
>(
  columnName: keyof EntityRelation,
  startValue?: ValueType,
  endValue?: ValueType,
  entityName?: string,
) {
  const propertyName = String(columnName);
  const start = startValue;
  const end = endValue;
  const paramStart = this.fGetParam();
  const paramEnd = this.fGetParam();
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (start) {
    this.andWhere(`${conditionColumn} >= :${paramStart}`, {
      [paramStart]: start,
    });
  }
  if (end) {
    this.andWhere(`${conditionColumn} <= :${paramEnd}`, {
      [paramEnd]: end,
    });
  }

  return this;
};

SelectQueryBuilder.prototype.fAndWhereGt = function <
  EntityRelation,
  ValueType = number,
>(
  columnName: keyof EntityRelation,
  startValue?: ValueType,
  entityName?: string,
) {
  const propertyName = String(columnName);
  const start = startValue;
  const paramStart = this.fGetParam();
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (start) {
    this.andWhere(`${conditionColumn} > :${paramStart}`, {
      [paramStart]: start,
    });
  }
  return this;
};
SelectQueryBuilder.prototype.fAndWhereLt = function <
  EntityRelation,
  ValueType = number,
>(columnName: keyof EntityRelation, endValue?: ValueType, entityName?: string) {
  const propertyName = String(columnName);
  const end = endValue;
  const paramEnd = this.fGetParam();
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (end) {
    this.andWhere(`${conditionColumn} < :${paramEnd}`, {
      [paramEnd]: end,
    });
  }
  return this;
};
SelectQueryBuilder.prototype.fAndWhereGte = function <
  EntityRelation,
  ValueType = number,
>(
  columnName: keyof EntityRelation,
  startValue?: ValueType,
  entityName?: string,
) {
  const propertyName = String(columnName);
  const start = startValue;
  const paramStart = this.fGetParam();
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (start) {
    this.andWhere(`${conditionColumn} >= :${paramStart}`, {
      [paramStart]: start,
    });
  }
  return this;
};

SelectQueryBuilder.prototype.fAndWhereLte = function <
  EntityRelation,
  ValueType = number,
>(columnName: keyof EntityRelation, endValue?: ValueType, entityName?: string) {
  const propertyName = String(columnName);
  const end = endValue;
  const paramEnd = this.fGetParam();
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (end) {
    this.andWhere(`${conditionColumn} <= :${paramEnd}`, {
      [paramEnd]: end,
    });
  }
  return this;
};

SelectQueryBuilder.prototype.fAddPagination = function (
  page,
  perPage,
  getFull,
) {
  const limit = perPage || this.query?.perPage || 10;
  const offset = (page - 1 || this.query?.page - 1 || 0) * limit;
  const isdPagination = getFull || this.query?.getFull || false;

  if (!isdPagination) {
    this.skip(offset).take(limit);
  }
  return this;
};
SelectQueryBuilder.prototype.fOrderBy = function (name, order, entityName) {
  const propertyName = String(name);

  this.orderBy(
    `${entityName || this.entityName}.${propertyName}`,
    order || this.query.sort || 'DESC',
  );
  return this;
};
SelectQueryBuilder.prototype.fAddOrderBy = function (name, order, entityName) {
  const propertyName = String(name);
  this.addOrderBy(
    `${entityName || this.entityName}.${propertyName}`,
    order || this.query.sort || 'DESC',
  );
  return this;
};
//filter in jsonb
SelectQueryBuilder.prototype.fAndWhereJsonb = function (
  name,
  propertyJsonName,
  cValue,
  entityName,
) {
  const propertyName = String(name);
  const paramsName = this.fGetParam();
  const value = cValue;
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (value) {
    this.andWhere(
      `${conditionColumn} ->> '${propertyJsonName}' =  :${paramsName}`,
      {
        [paramsName]: value,
      },
    );
  }
  return this;
};

SelectQueryBuilder.prototype.fAndWhereUnAccentStringJsonb = function (
  name,
  propertyJsonName,
  valueString,
  entityName,
) {
  const propertyName = String(name);
  const value = valueString;
  const paramsName = this.fGetParam();
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (value) {
    this.andWhere(
      `unaccent(LOWER(${conditionColumn} ->> '${propertyJsonName}' )) ILIKE unaccent(LOWER(:${paramsName}))`,
      {
        [`${paramsName}`]: `%${value}%`,
      },
    );
  }
  return this;
};
SelectQueryBuilder.prototype.fAndWhereDateJsonb = function (
  name,
  propertyJsonName,
  startValue,
  endValue,
  entityName,
) {
  const propertyName = String(name);
  const start = startValue;
  const end = endValue;
  const paramStart = this.fGetParam();
  const paramEnd = this.fGetParam();
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;

  if (start) {
    this.andWhere(
      `${conditionColumn} ->> '${propertyJsonName}' >= :${paramStart}`,
      {
        [paramStart]: start,
      },
    );
  }
  if (end) {
    this.andWhere(
      `${conditionColumn} ->> '${propertyJsonName}' <= :${paramEnd}`,
      {
        [paramEnd]: end,
      },
    );
  }

  return this;
};

SelectQueryBuilder.prototype.fAndWhereNull = function (
  name,
  cValue,
  entityName,
) {
  const propertyName = String(name);
  const conditionColumn = `${entityName || this.entityName}.${propertyName}`;
  const value = cValue;
  if (value !== undefined) {
    this.andWhere(`${conditionColumn} ${value ? 'IS NULL' : 'IS NOT NULL'}`);
  }
  return this;
};
