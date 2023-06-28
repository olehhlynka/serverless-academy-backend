import { User } from "./user";

export interface UserWithTokens {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
