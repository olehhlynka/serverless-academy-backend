const {
  userSchema,
  refreshTokenSchema,
} = require("../validations/validations");
const {
  ACCESS_TOKEN_SECRET,
} = require("../config/constants");
const jwt = require("jsonwebtoken");

const validateUserCredentials = (req, res, next) => {
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: `One or more fields are missing or invalid`,
    });
  }
  next();
};

const validateToken = (req, res, next) => {
  const validationResult = refreshTokenSchema.validate(
    req.body
  );
  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: `Token field missing or invalid`,
    });
  }
  next();
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({
      success: false,
      error: "Access token was not provided",
    });
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: "Invalid token",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  validateUserCredentials,
  validateToken,
  authenticateToken,
};
