const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../config/db");
const {
  SALT_ROUNDS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TOKEN_TTL,
} = require("../config/constants");

class AuthService {
  async loginUser(email, password) {
    const user = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (user.rows.length === 0) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].pass_hash
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const tokens = this.generateTokens(user.rows[0]);
    return { user: user.rows[0], tokens: tokens };
  }

  async registerUser(email, password) {
    if (await this.isEmailTaken(email)) {
      throw new Error(`Email ${email} is already taken`);
    }
    const hashedPassword = await bcrypt.hash(
      password,
      SALT_ROUNDS
    );
    const uuid = crypto.randomUUID();
    const newUser = await db.query(
      `INSERT INTO users (id, email, pass_hash) VALUES ($1, $2, $3) RETURNING *`,
      [uuid, email, hashedPassword]
    );
    const tokens = this.generateTokens(newUser.rows[0]);
    await db.query(
      `UPDATE users SET refresh_token = $1 WHERE id = $2`,
      [tokens.refreshToken, uuid]
    );
    return { user: newUser.rows[0], tokens: tokens };
  }

  async isEmailTaken(email) {
    const existingUser = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return existingUser.rows.length !== 0;
  }

  getUserFromRefreshToken(token) {
    try {
      const userDetails = jwt.verify(
        token,
        REFRESH_TOKEN_SECRET
      );
      return userDetails;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  async getUserRefreshToken(email) {
    const user = await db.query(
      `SELECT refresh_token FROM users WHERE email = $1`,
      [email]
    );
    return user.rows[0].refresh_token;
  }

  generateTokens(user) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  generateRefreshToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      REFRESH_TOKEN_SECRET
    );
  }

  generateAccessToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: TOKEN_TTL,
      }
    );
  }
}

module.exports = new AuthService();
