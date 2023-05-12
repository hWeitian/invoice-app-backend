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

async function getFromCompany(req, res) {
  const { companyId } = req.params;
  try {
    const newContact = await Contact.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "designation",
        "email",
        // [
        //   sequelize.literal(
        //     `SELECT concat(first_name, ' ', last_name) AS name FROM contacts`
        //   ),
        // ],
      ],
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
  getFromCompany,
  getFromEmail,
};
