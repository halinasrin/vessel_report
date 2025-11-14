const models = require("../models");

const reportIssue = async (req, res) => {
  const { vesselId, category, description, priority } = req.body;
  if (!vesselId || !category || !description) return res.status(400).json({ message: "vesselId, category and description required" });

  const vessel = await models.Vessel.findByPk(vesselId, { include: [ { model: models.Issue, as: "issues" }] });
  if (!vessel) return res.status(404).json({ message: "Vessel not found" });

  const openIssuesCount = await models.Issue.count({ where: { vesselId, status: { [models.Sequelize.Op.ne]: "Closed" } } });
  if (openIssuesCount >= 3) {
    return res.status(400).json({ message: "Cannot create issue: vessel already has 3 unresolved issues" });
  }

  const issue = await models.Issue.create({
    category, description, priority: priority || "Medium", vesselId, userId: req.user.id
  });
  res.status(201).json(issue);
};

const myIssues = async (req, res) => {
  const issues = await models.Issue.findAll({ where: { userId: req.user.id }, include: [models.Vessel] });
  res.json(issues);
};

module.exports = { reportIssue, myIssues };
