const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const {
  validateUserCredentials,
  validateToken,
} = require("../middlewares/middlewares");

router.post(
  "/sign-in",
  validateUserCredentials,
  authController.signIn
);
router.post(
  "/sign-up",
  validateUserCredentials,
  authController.signUp
);
router.post(
  "/refresh",
  validateToken,
  authController.refreshToken
);

module.exports = router;
