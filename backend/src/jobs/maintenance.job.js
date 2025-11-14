const cron = require("node-cron");
const models = require("../models");

// schedule every 10 minutes
const start = () => {
  cron.schedule("*/10 * * * *", async () => {
    try {
      console.log("Running maintenance job: checking open issues per vessel...");
      const vessels = await models.Vessel.findAll();
      for (const vessel of vessels) {
        const openCount = await models.Issue.count({
          where: { vesselId: vessel.id, status: { [models.Sequelize.Op.ne]: "Closed" } }
        });
        if (openCount >= 3 && vessel.status !== "Under Maintenance") {
          await vessel.update({ status: "Under Maintenance" });
          console.log(`Vessel ${vessel.id} marked Under Maintenance`);
        } else if (openCount < 3 && vessel.status === "Under Maintenance") {
          // optional: revert to Active when < 3
          await vessel.update({ status: "Active" });
          console.log(`Vessel ${vessel.id} marked Active`);
        }
      }
    } catch (err) {
      console.error("Maintenance job error:", err);
    }
  }, { timezone: "UTC" });
};

module.exports = { start };
