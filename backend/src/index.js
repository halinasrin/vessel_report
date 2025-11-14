const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const models = require("./models");
const sequelize = models.sequelize;
const authCtrl = require("./controllers/auth.controller");
const job = require("./jobs/maintenance.job");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    // sync DB - for production consider migrations instead
    await sequelize.sync({ alter: true });
    console.log("Database synced");

    // create default admin if no users
    await authCtrl.registerAdminIfNone();

    // start scheduled job
    job.start();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
})();
