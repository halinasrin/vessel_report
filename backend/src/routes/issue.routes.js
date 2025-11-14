const express = require("express");
const router = express.Router();
const issueCtrl = require("../controllers/issue.controller");
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const ROLES = require("../utils/roles");

router.post("/", authMiddleware,requireRole(ROLES.FLEET_MANAGER), issueCtrl.reportIssue);
router.get("/my", authMiddleware, issueCtrl.myIssues);

module.exports = router;
