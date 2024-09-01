const { db } = require("../db/models/index");
const { GstRate } = db;

async function getAll(req, res) {
  try {
    const gstRate = await GstRate.findAll();
    return res.json(gstRate);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateGstRate(req, res) {
  const data = req.body;
  const { id } = req.params;

  console.log(data);
  console.log(id);

  try {
    const updatedRate = await GstRate.update(data, { where: { id: id } });
    return res.json(updatedRate);
  } catch (e) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  updateGstRate,
};
