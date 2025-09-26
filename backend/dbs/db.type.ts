export type WithId<T> = T & { id: bigint };

// 아래 타입들은 몽고디비 노드 드라이버 타입을 참조했습니다.
interface Document {
  [key: string]: any;
}

export type Filter<TSchema> = {
  [P in keyof WithId<TSchema>]?: WithId<TSchema>[P] | RegExp;
};

export interface FindOptions<TSchema> {
  sort?: Sort<TSchema>;
  projection?: Document;
  limit?: number;
  skip?: number;
}

export type Sort<TSchema> = {
  [key in keyof Partial<TSchema>]: SortDirection;
};

type SortDirection = 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending';
