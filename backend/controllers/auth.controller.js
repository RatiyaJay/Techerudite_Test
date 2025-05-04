const db = require("../models");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res, role) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ msg: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = uuidv4().slice(0, 6);

  const user = await db.User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    verificationCode,
  });

  await sendEmail(email, verificationCode);

  res
    .status(201)
    .json({ msg: "User registered. Check email for verification code." });
};

exports.verify = async (req, res) => {
  const { email, code } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (user.verificationCode !== code) {
    return res.status(400).json({ msg: "Invalid verification code" });
  }

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  res.json({ msg: "Account verified successfully" });
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    console.log("User not found");
    return res.status(404).json({ msg: "User not found" });
  }

  if (user.role !== "admin") {
    console.log("You are not allowed to login from here");
    return res
      .status(403)
      .json({ msg: "You are not allowed to login from here" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ msg: "Please verify your email first" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json({
    msg: "Login successful",
    user: { email: user.email, role: user.role },
  });
};
