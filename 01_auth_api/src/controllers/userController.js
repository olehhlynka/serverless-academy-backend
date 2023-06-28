class UserController {
  async getCurrentUser(req, res) {
    res.status(200).json({
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
      },
    });
  }
}

module.exports = new UserController();
