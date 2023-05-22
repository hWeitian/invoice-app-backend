const db = require("../db/models/index");

const { Contact, Company } = db;

async function getAll(req, res) {
  try {
    const newContact = await Contact.findAll();
    return res.json(newContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getFromCompany(req, res) {
  const { companyId } = req.params;
  try {
    const newContact = await Contact.findAll({
      attributes: ["id", "firstName", "lastName", "designation", "email"],
      where: { companyId: companyId },
    });
    return res.json(newContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getFromEmail(req, res) {
  const { email } = req.params;
  try {
    const currentUser = await Contact.findOne({ where: { email: email } });
    return res.json(currentUser);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getPaginatedData(req, res) {
  const { page, size } = req.params;
  try {
    const newContacts = await Contact.findAndCountAll({
      include: [{ model: Company }],
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["id", "ASC"]],
    });
    return res.json(newContacts);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function addContact(req, res) {
  const newData = req.body;
  try {
    const newContact = await Contact.create(newData);
    return res.json(newContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateContact(req, res) {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedContact = await Contact.update(newData, {
      where: { id: id },
    });
    return res.json(updatedContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function deleteContact(req, res) {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.destroy({
      where: { id: id },
    });
    return res.json(deletedContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  getFromCompany,
  getFromEmail,
  getPaginatedData,
  addContact,
  updateContact,
  deleteContact,
};
