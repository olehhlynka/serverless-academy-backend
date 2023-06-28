const authService = require("../services/authService");

class AuthController {
  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const { user, tokens } = await authService.loginUser(
        email,
        password
      );
      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } catch (error) {
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

  async signUp(req, res) {
    const { email, password } = req.body;
    try {
      const { user, tokens } =
        await authService.registerUser(email, password);
      res.status(201).json({
        success: true,
        data: {
          id: user.id,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } catch (error) {
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

  async refreshToken(req, res) {
    const { refreshToken } = req.body;
    try {
      if (!refreshToken) {
        return res
          .status(401)
          .json({ success: false, error: "Unauthorized" });
      }
      const user =
        await authService.getUserFromRefreshToken(
          refreshToken
        );
      if (
        (await authService.getUserRefreshToken(
          user.email
        )) !== refreshToken
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
    } catch (error) {
      if (error.message === "Invalid token") {
        return res.status(403).json({
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
}

module.exports = new AuthController();
