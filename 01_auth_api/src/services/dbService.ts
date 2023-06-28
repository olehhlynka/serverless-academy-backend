import { QueryResult } from "pg";
import { User } from "../interfaces/user";
import db from "../config/db";

const getUser = async (
  email: string
): Promise<User | undefined> => {
  const queryResult: QueryResult<User> = await db.query(
    `SELECT id, email, passwordhash AS "passwordHash", \
    refreshtoken AS "refreshToken" FROM users WHERE email = $1`,
    [email]
  );
  return queryResult.rows[0];
};

const createNewUser = async (user: User): Promise<User> => {
  const queryResult: QueryResult<User> = await db.query(
    `INSERT INTO users (id, email, passwordhash, refreshtoken) \
    VALUES ($1, $2, $3, $4) RETURNING id, email, passwordhash \
    AS "passwordHash", refreshtoken as "refreshToken"`,
    [
      user.id,
      user.email,
      user.passwordHash,
      user.refreshToken,
    ]
  );
  return queryResult.rows[0];
};

const getUserRefreshToken = async (
  email: string
): Promise<string | undefined> => {
  const user: QueryResult<User> = await db.query(
    `SELECT refreshtoken as "refreshToken" FROM users WHERE email = $1`,
    [email]
  );
  return user.rows[0].refreshToken;
};
export { getUser, createNewUser, getUserRefreshToken };
