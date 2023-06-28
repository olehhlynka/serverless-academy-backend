import authService from "../services/authService";
import { Request, Response } from "express";

class AuthController {
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { user, tokens } = await authService.loginUser(
        email,
        password
      );
      return res.status(200).json({
        success: true,
        data: {
          id: user.id,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        return res
          .status(404)
          .json({ success: false, message: error.message });
      }
      res.status(502).json({
        success: false,
        message: "Invalid request",
      });
    }
  }

  async signUp(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { user, tokens } =
        await authService.registerUser(email, password);
      return res.status(201).json({
        success: true,
        data: {
          id: user.id,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } catch (error: any) {
      if (
        error.message === `Email ${email} is already taken`
      ) {
        return res.status(409).json({
          success: false,
          error: error.message,
        });
      }
      res.status(502).json({
        success: false,
        error: "Invalid request",
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    try {
      const user =
        await authService.getUserInfoFromRefreshToken(
          refreshToken
        );
      if (
        !(await authService.isValidRefreshToken(
          refreshToken,
          user.email
        ))
      ) {
        return res
          .status(403)
          .json({ success: false, error: "Forbidden" });
      }
      const accessToken =
        authService.generateAccessToken(user);
      return res.status(200).json({
        success: true,
        data: {
          id: user.id,
          accessToken: accessToken,
        },
      });
    } catch (error: any) {
      res.status(502).json({
        success: false,
        error: "Invalid request",
      });
    }
  }
}

export default new AuthController();
