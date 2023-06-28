import { UserInfo } from "./userInfo";

export interface User extends UserInfo {
  passwordHash: string;
  refreshToken?: string;
}
