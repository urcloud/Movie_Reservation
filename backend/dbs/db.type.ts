export type WithId<T> = T & { id: bigint };

// 아래 타입들은 몽고디비 노드 드라이버 타입을 참조했습니다.
export type Filter<T> = {
  [P in keyof WithId<T>]?: WithId<T>[P] | RegExp;
};

export interface FindOptions<T> {
  sort?: Sort<T>;
  limit?: number;
  skip?: number;
}

export type Sort<T> = {
  [key in keyof Partial<T>]: SortDirection;
};

type SortDirection = 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending';
