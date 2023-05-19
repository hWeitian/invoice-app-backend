const db = require("../db/models/index");

const { orderRegion } = db;

async function getAll(req, res) {
  try {
    const newOrderRegion = await orderRegion.findAll();
    return res.json(newOrderRegion);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
