const { verify } = require("../utils/jwt");
const models = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });
    const token = auth.split(" ")[1];
    const payload = verify(token);
    const user = await models.User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: "Invalid token" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed", error: err.message });
  }
};

// Support single role or array of roles
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });

    if (Array.isArray(roles)) {
      if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    } else {
      if (req.user.role !== roles) return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

module.exports = { authMiddleware, requireRole };
