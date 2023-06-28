import { UserInfo } from "./userInfo";

declare module "express-serve-static-core" {
  export interface Request {
    userInfo: UserInfo;
  }
}
