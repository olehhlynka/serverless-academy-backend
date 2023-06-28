import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import crypto from "crypto";
import {
  createNewUser,
  getUser,
  getUserRefreshToken,
} from "./dbService";
import { UserInfo } from "../interfaces/userInfo";
import { User } from "../interfaces/user";
import { UserWithTokens } from "../interfaces/userWithTokens";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TOKEN_TTL,
  SALT_ROUNDS,
} from "../config/constants";

class AuthService {
  async loginUser(
    email: string,
    password: string
  ): Promise<UserWithTokens> {
    const user = await getUser(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const accessToken = this.generateAccessToken(user);
    return {
      user,
      tokens: {
        accessToken,
        refreshToken: user.refreshToken!,
      },
    };
  }

  async registerUser(email: string, password: string) {
    if (await this.isEmailTaken(email)) {
      throw new Error(`Email ${email} is already taken`);
    }
    const hashedPassword = await bcrypt.hash(
      password,
      SALT_ROUNDS
    );
    const uuid = crypto.randomUUID();
    const newUser: User = {
      id: uuid,
      email: email,
      passwordHash: hashedPassword,
    };
    const tokens = this.generateTokens(newUser);
    newUser.refreshToken = tokens.refreshToken;
    await createNewUser(newUser);
    return { user: newUser, tokens: tokens };
  }

  async isValidRefreshToken(token: string, email: string) {
    return (await getUserRefreshToken(email)) === token;
  }

  async isEmailTaken(email: string) {
    const user = await getUser(email);
    return !!user;
  }

  getUserInfoFromRefreshToken(token: string): UserInfo {
    const decodedUserInfo = jwt.verify(
      token,
      REFRESH_TOKEN_SECRET
    ) as JwtPayload;
    return decodedUserInfo as UserInfo;
  }

  generateTokens(user: UserInfo) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  generateRefreshToken(user: UserInfo) {
    return jwt.sign(
      { id: user.id, email: user.email },
      REFRESH_TOKEN_SECRET
    );
  }

  generateAccessToken(user: UserInfo) {
    return jwt.sign(
      { id: user.id, email: user.email },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: TOKEN_TTL,
      }
    );
  }
}

export default new AuthService();
