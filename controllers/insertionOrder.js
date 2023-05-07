const db = require("../db/models/index");

const { InsertionOrder } = db;

async function getAll(req, res) {
  try {
    const newInsertionOrder = await InsertionOrder.findAll();
    return res.json(newInsertionOrder);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
