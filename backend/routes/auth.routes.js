const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register/customer", (req, res) =>
  authController.register(req, res, "customer")
);
router.post("/register/admin", (req, res) =>
  authController.register(req, res, "admin")
);
router.post("/verify", authController.verify);
router.post("/admin-login", authController.adminLogin);

module.exports = router;
