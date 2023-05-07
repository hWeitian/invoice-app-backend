const db = require("../db/models/index");

const { CreditNote } = db;

async function getAll(req, res) {
  try {
    const newCreditNote = await CreditNote.findAll();
    return res.json(newCreditNote);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
