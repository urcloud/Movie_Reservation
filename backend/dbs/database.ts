// BigInt가 toJSON메소드를 가지고 있지 않으므로 지정해줘야 토큰 만들 때 에러가 발생하지 않습니다.
BigInt.prototype.toJSON = function () {
  return this.toString();
};

import { Pool, QueryConfig, QueryResultRow, types } from 'pg';
import {
  createInsertManyQuery,
  createInsertQuery,
  createRemoveQueryById,
  createUpdateQueryById,
  getFilterText,
  getFindOptionsText,
} from './queries';
import { Filter, FindOptions, WithId } from './db-type';
import { appConfig } from '../configs/app-config';

// 다음은 포스트그레스 NUMERIC 타입을 자바스크립트 number 타입으로 변경합니다.
types.setTypeParser(types.builtins.NUMERIC, (value: any) => parseFloat(value));

const pool = new Pool({ connectionString: appConfig.dbUri });

export const connectToPg = async () => {
  await pool.connect();
};

/**
 *
 * @param tableName 테이블 이름
 * @param filter filter가 모델의 부분이면 주어진 조건을 모두 만족하는 것을 찾고, string 문자열이면 sql raw text를 입력
 * @returns WithId<T>[]
 */
export const find = async <T extends QueryResultRow>(
  tableName: string,
  filter?: Filter<T>,
  options?: FindOptions<T>,
) => {
  let text = `SELECT * FROM ${tableName}`;
  if (filter && !isEmpty(filter)) {
    const whereText = getFilterText(filter);
    text += ` WHERE ${whereText}`;
  }
  // console.log('options in find ', options);
  if (options && !isEmpty(options)) {
    text += getFindOptionsText(options);
  }
  console.log('find sql text:', text);
  return (await query<WithId<T>>(text)).rows;
};

export const findOne = async <T extends QueryResultRow>(
  tableName: string,
  filter: Partial<T>,
): Promise<WithId<T> | undefined> => {
  const whereText = getFilterText(filter);
  const text = `SELECT * FROM ${tableName} WHERE ${whereText}`;
  console.log('find one sql text:', text);
  const rows = (await query<WithId<T>>(text)).rows;
  return rows[0];
};

export const findOneById = async <T extends QueryResultRow>(
  tableName: string,
  id: number | bigint,
): Promise<WithId<T> | undefined> => {
  const text = `SELECT * FROM ${tableName} WHERE id=${id}`;
  return (await query<WithId<T>>(text)).rows[0];
};

export const insertOne = async <T extends {}>(tableName: string, model: T) => {
  const queryConfig = createInsertQuery<T>(tableName, model);
  return (await query<WithId<T>>(queryConfig)).rows[0];
};

export const insertMany = async <T extends {}>(
  tableName: string,
  models: T[],
) => {
  if (!models?.length) {
    return;
  }
  const queryConfig = createInsertManyQuery(tableName, models);
  return (await query<WithId<T>>(queryConfig)).rows;
};

export const query = <T extends QueryResultRow>(
  queryTextOrConfig: string | QueryConfig,
  values?: any,
) => {
  console.log('query sql=', queryTextOrConfig, ', values=', values);
  return pool.query<T>(queryTextOrConfig, values);
};

export const remove = async <T extends QueryResultRow>(
  tableName: string,
  filter: Filter<T>,
) => {
  let text = `DELETE FROM ${tableName}`;
  if (filter && !isEmpty(filter)) {
    const whereText = getFilterText(filter);
    text += ` WHERE ${whereText}`;
  }
  text += ' RETURNING *';
  console.log('database remove query text=', text);
  return (await query(text)).rows[0];
};

export const removeById = async <T extends QueryResultRow>(
  tableName: string,
  id: number | bigint,
) => {
  const queryConfig = createRemoveQueryById(tableName, id);
  return (await query<T>(queryConfig)).rows[0];
};

export const updateOne = async <T extends QueryResultRow>(
  tableName: string,
  model: Partial<T>,
  id: number | bigint,
) => {
  const queryConfig = createUpdateQueryById<T>(tableName, model, id);
  return (await query<WithId<T>>(queryConfig)).rows[0];
};

export function isEmpty(obj: object) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}
