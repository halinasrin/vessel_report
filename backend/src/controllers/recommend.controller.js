const models = require("../models");
const cache = require("../utils/cache");

const recommend = async (req, res) => {
  const { category, type } = req.query;
  if (!category && !type) return res.status(400).json({ message: "Provide category or type" });

  const cacheKey = `recommend:${category || ""}:${type || ""}`;
  const cached = await cache.get(cacheKey);
  if (cached) return res.json({ cached: true, data: cached });

  // Query similar past issues by category or vessel type
  // If type supplied, join with vessel.
  const whereIssue = {};
  if (category) whereIssue.category = category;

  let issues;
  if (type) {
    issues = await models.Issue.findAll({
      include: [
        { model: models.Vessel, where: { type }, attributes: ["id","name","type","imoNumber"] }
      ],
      where: whereIssue,
      limit: 20,
      order: [["createdAt", "DESC"]]
    });
  } else {
    issues = await models.Issue.findAll({
      where: whereIssue,
      include: [{ model: models.Vessel, attributes: ["id","name","type","imoNumber"] }],
      limit: 20,
      order: [["createdAt", "DESC"]]
    });
  }

  await cache.set(cacheKey, issues, 300); // cache 5 minutes
  res.json({ cached: false, data: issues });
};

module.exports = { recommend };
