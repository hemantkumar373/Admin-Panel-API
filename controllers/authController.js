const user = require("../db/models/userschema.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  signUpSchema,
  loginSchema,
} = require("../middleware/validationSchema.js");

const register = async (req, res) => {
  const { error } = signUpSchema.validate(req.body);
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should be greater than 3" });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length should be greater than 5" });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    const newUser = new user({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  // const { error } = signUpSchema.validate(req.body);
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should be greater than 3" });
    }
    const existingUser = await user.findOne({ username });
    console.log("exist", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length should be greater than 5" });
    }

    console.log("I was here");
    const hashedPassword = await bcryptjs.hash(password, 16);
    console.log(hashedPassword);

    const newUser = new user({
      username,
      email,
      password: hashedPassword,
      role,
    });
    console.log(newUser);
    await newUser.save();
    return res
      .status(200)
      .json({ message: "Account created successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", err: error });
  }
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    const User = await user.findOne({ username });
    if (!User) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isValidPassword = await bcryptjs.compare(password, User.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const tokenData = {
      userId: User._id,
      role: User.role,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "Logged in successfully",
      id: User._id,
      role: User.role,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  signup,
  login,
};
