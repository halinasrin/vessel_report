const models = require("../models");

const createVessel = async (req, res) => {
  const { name, imoNumber, flag, type, status, lastInspection, crewIds } = req.body;
  if (!name || !imoNumber) return res.status(400).json({ message: "name and imoNumber required" });
  const exists = await models.Vessel.findOne({ where: { imoNumber } });
  if (exists) return res.status(409).json({ message: "Vessel with this IMO already exists" });
  const vessel = await models.Vessel.create({
    name, imoNumber, flag, type, status: status || "Active", lastInspection: lastInspection || null
  });
  if (Array.isArray(crewIds) && crewIds.length) {
    const users = await models.User.findAll({ where: { id: crewIds } });
    await vessel.setCrew(users);
  }
  res.status(201).json(vessel);
};

const updateVessel = async (req, res) => {
  const id = req.params.id;
  const { name, flag, type, status, lastInspection, crewIds } = req.body;
  const vessel = await models.Vessel.findByPk(id);
  if (!vessel) return res.status(404).json({ message: "Vessel not found" });
  await vessel.update({ name, flag, type, status, lastInspection });
  if (Array.isArray(crewIds)) {
    const users = await models.User.findAll({ where: { id: crewIds } });
    await vessel.setCrew(users);
  }
  res.json(vessel);
};

const listVessels = async (req, res) => {
  const vessels = await models.Vessel.findAll({ include: [{ model: models.User, as: "crew", attributes: ["id","name","email"] },  { model: models.Issue, as: "issues" }] });
  res.json(vessels);
};

const getVessel = async (req, res) => {
  const id = req.params.id;
  const vessel = await models.Vessel.findByPk(id, { include: [{ model: models.User, as: "crew", attributes: ["id","name","email"] }, { model: models.Issue, as: "issues" }] });
  if (!vessel) return res.status(404).json({ message: "Vessel not found" });
  res.json(vessel);
};

module.exports = { createVessel, updateVessel, listVessels, getVessel };
