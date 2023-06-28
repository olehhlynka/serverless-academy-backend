import { Request, Response } from "express";

class UserController {
  async getCurrentUser(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      data: {
        id: req.userInfo.id,
        email: req.userInfo.email,
      },
    });
  }
}

export default new UserController();
