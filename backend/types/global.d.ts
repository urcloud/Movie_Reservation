import { ExpressUserRequest, UserModel } from '../users/user.model';
import { WithId } from '../helpers/type.helper';

declare global {
  namespace Express {
    export interface Request {
      auth?: WithId<UserModel>;
      user?: ExpressUserRequest;
    }
  }
}

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// export {};
