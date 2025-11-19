import { UserExpressRequest, UserModel } from '../users/user-model';
import { WithId } from '../helpers/type.helper';

declare global {
  namespace Express {
    export interface Request {
      auth?: WithId<UserModel>;
      user?: UserExpressRequest;
    }
  }
}

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// export {};
