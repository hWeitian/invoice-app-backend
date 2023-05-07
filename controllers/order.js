const db = require("../db/models/index");

const { Order } = db;

async function getAll(req, res) {
  try {
    const newOrder = await Order.findAll();
    return res.json(newOrder);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
