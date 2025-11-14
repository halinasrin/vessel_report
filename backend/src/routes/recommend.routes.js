const express = require("express");
const router = express.Router();
const recCtrl = require("../controllers/recommend.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/", authMiddleware, recCtrl.recommend);

module.exports = router;
