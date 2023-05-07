const db = require("../db/models/index");

const { Invoice } = db;

async function getAll(req, res) {
  try {
    const newInvoice = await Invoice.findAll();
    return res.json(newInvoice);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
