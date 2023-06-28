const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const {
  authenticateToken,
} = require("../middlewares/middlewares");

router.use(authenticateToken);
router.get("/me", userController.getCurrentUser);

module.exports = router;
