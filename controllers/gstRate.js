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

module.exports = {
  getAll,
};
