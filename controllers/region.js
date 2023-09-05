const { db } = require("../db/models/index");

const { Region } = db;

async function getAll(req, res) {
  try {
    const newRegion = await Region.findAll();
    return res.json(newRegion);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
