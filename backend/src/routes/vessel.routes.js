const express = require("express");
const router = express.Router();
const vesselCtrl = require("../controllers/vessel.controller");
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const ROLES = require("../utils/roles");

// Admin only routes
router.post("/", authMiddleware, requireRole(ROLES.ADMIN), vesselCtrl.createVessel);
router.put("/:id", authMiddleware, requireRole(ROLES.ADMIN), vesselCtrl.updateVessel);

// Admin or FleetManager can view vessels
router.get("/", authMiddleware, requireRole([ROLES.ADMIN, ROLES.FLEET_MANAGER]), vesselCtrl.listVessels);
router.get("/:id", authMiddleware, requireRole([ROLES.ADMIN, ROLES.FLEET_MANAGER]), vesselCtrl.getVessel);

module.exports = router;
