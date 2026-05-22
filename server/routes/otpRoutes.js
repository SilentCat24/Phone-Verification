const express = require("express");
const router = express.Router();
const {sendOtp,verifyOtp} = require("../Controllers/otpController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/send",authMiddleware, sendOtp);
router.post("/verify",authMiddleware, verifyOtp);

module.exports = router;