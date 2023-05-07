const db = require("../db/models/index");

const { Payment } = db;

async function getAll(req, res) {
  try {
    const newPayment = await Payment.findAll();
    return res.json(newPayment);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
