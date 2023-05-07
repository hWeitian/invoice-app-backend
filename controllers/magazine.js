const db = require("../db/models/index");

const { Magazine } = db;

async function getAll(req, res) {
  try {
    const newMagazine = await Magazine.findAll();
    return res.json(newMagazine);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
