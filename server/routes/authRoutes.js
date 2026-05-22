const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth Working");
});

router.post("/register", (req, res) => {
  res.send("Register Route Working");
});

