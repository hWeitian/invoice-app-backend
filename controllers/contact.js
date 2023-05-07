const db = require("../db/models/index");

const { Contact } = db;

async function getAll(req, res) {
  try {
    const newContact = await Contact.findAll();
    return res.json(newContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getOne(req, res) {
  try {
    const newContact = await Contact.findOne({ where: { id: 1 } });
    return res.json(newContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
