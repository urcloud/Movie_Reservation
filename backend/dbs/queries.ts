import { QueryConfig } from 'pg';
import { Filter, FindOptions, Sort } from './db.type';

export const createInsertQuery = <T extends {}>(
  tableName: string,
  model: T,
): QueryConfig => {
  let text = `INSERT INTO ${tableName} (`;
  text += Object.keys(model)
    .map((key) => key)
    .join(', ');
  text += `) VALUES (`;
  text += Object.values(model)
    .map((_, index) => `$${index + 1}`)
    .join(', ');
  text += `) RETURNING *`;
  const values = Object.values(model);
  return { text, values };
};

export const createInsertManyQuery = <T extends {}>(
  tableName: string,
  models: T[],
) => {
  const model = models[0];

  let text = `INSERT INTO ${tableName} (`;
  text += Object.keys(model)
    .map((key) => key)
    .join(', ');
  text += `) VALUES `;

  const numberedPairText = getNumberedPair(models);
  text += numberedPairText;
  text += ` RETURNING *`;
  const values = getFlatValues(models);
  console.log('insert many sql text:', text, 'values:', values);
  return { text, values };
};

export const createUpdateQueryById = <T>(
  tableName: string,
  model: Partial<T>,
  id: number | bigint,
) => {
  let text = `UPDATE ${tableName} SET `;
  text += Object.entries(model)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key} = '${value}'`;
      } else if (value instanceof Date) {
        return `${key} = '${value.toISOString()}'`;
      } else {
        if (value === undefined) {
          return `${key} = null`;
        }
        return `${key} = ${value}`;
      }
    })
    .join(', ');
  text += ` WHERE id=${id} RETURNING *`;
  return { text };
};

export const createRemoveQueryById = (
  tableName: string,
  id: number | bigint,
) => {
  let text = `DELETE FROM ${tableName} WHERE id=${id} RETURNING *`;
  return text;
};

const getFlatValues = <T extends {}>(arr: T[]) => {
  const values = arr.reduce(
    (accu, curr) => [...accu, ...Object.values(curr)],
    [] as any,
  );
  return values;
};

const getPairedValueText = <T extends {}>(model: T) => {
  let text = Object.entries(model)
    .filter(([_, v]) => v !== undefined && v !== null)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `'${value}'`;
      } else if (value instanceof Date) {
        return `'${value.toISOString()}'`;
      } else {
        return `${value}`;
      }
    })
    .join(', ');
  text = '(' + text + ')';
  return text;
};

const getNumberedPair = <T extends {}>(models: T[]) => {
  let numKeys = Object.keys(models[0]).length;
  let numberedPair = models
    .map((model, i) => {
      let itemPair = Object.keys(model)
        .map((_, j) => `$${i * numKeys + j + 1}`)
        .join(', ');
      return '(' + itemPair + ')';
    })
    .join(', ');
  console.log('paired number text:', numberedPair);
  return numberedPair;
};

export const getPairedValuesText = <T extends {}>(models: T[]) => {
  const values = models.map((model) => getPairedValueText(model)).join(', ');
  return values;
};

export const getFilterText = <T>(filter: Filter<T>) => {
  const whereText = Object.entries(filter)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}='${value}'`;
      } else if (value instanceof RegExp) {
        return `${key} ~ '${value.flags ? `(?${value.flags})` : ''}${value.source}'`;
      } else {
        return `${key}=${value}`;
      }
    })
    .join(' AND ');
  return whereText;
};

export const getFindOptionsText = <T>(options: FindOptions<T>) => {
  console.log('options', options);
  return Object.entries<any>(options)
    .map(([key, sort]) => {
      console.log('get find options text key', key, sort);
      if (key === 'sort') {
        const sortText = getSortText(sort);
        return sortText;
      }
    })
    .join(' AND ');
};

const getSortText = <T>(sortOption: Sort<T>) => {
  let text = Object.entries(sortOption)
    .map(([k, v]) => {
      if (v === 1 || v === 'asc' || v === 'ascending') {
        return ` ${k} ASC `;
      } else if (v === -1 || v === 'desc' || v === 'descending') {
        return ` ${k} DESC `;
      }
      return '';
    })
    .join(', ');
  text = ` ORDER BY ${text} `;
  return text;
};
