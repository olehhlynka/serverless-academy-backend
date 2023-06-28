import { JwtPayload } from "jsonwebtoken";
import { UserInfo } from "./userInfo";

declare module "jsonwebtoken" {
  export interface JwtPayload extends UserInfo {}
}
