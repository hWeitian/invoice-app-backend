const { db } = require("../db/models/index");

const { CreditItem } = db;

async function getAll(req, res) {
  try {
    const newCreditItem = await CreditItem.findAll();
    return res.json(newCreditItem);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
