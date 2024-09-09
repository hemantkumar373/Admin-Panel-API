const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated.",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Authentication failed.",
      success: false,
    });
  }
};

module.exports = isAuthenticated;
