export enum ROLE_NAME {
  'ADMIN' = 'admin',
  'USER' = 'user',
  'GUEST' = 'guest',
}

export type RoleModel = {
  id: bigint;
  priority: number;
  role_name: ROLE_NAME;
};
