const bcrypt = require("bcrypt");
const models = require("../models");
const jwtUtil = require("../utils/jwt");
const ROLES = require("../utils/roles");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    const user = await models.User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwtUtil.sign({ id: user.id, email: user.email, role: user.role });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

const registerAdminIfNone = async () => {
    // convenience helper: create default admin if none present
    const count = await models.User.count();
    if (count === 0) {
        const password = await bcrypt.hash("Admin@123", 10);
        await models.User.create({
            name: "Admin",
            email: "admin@example.com",
            password,
            role: ROLES.ADMIN,
        });
        console.log("Default admin created: admin@example.com / Admin@123");

        await models.User.create({
            name: "FleetManager",
            email: "fm@example.com",
            password,
            role: ROLES.FLEET_MANAGER,
        });
        console.log("Default fleet manager created: fm@example.com / Admin@123");
    }
};

module.exports = { login, registerAdminIfNone };
