const db = require("../db/models/index");

const { Company, Contact } = db;

async function getAll(req, res) {
  try {
    const newCompany = await Company.findAll();
    return res.json(newCompany);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getOne(req, res) {
  const { id } = req.params;
  try {
    const newCompany = await Company.findOne({
      where: { id: id },
      include: Contact,
    });
    return res.json(newCompany);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getAllNames(req, res) {
  try {
    // Get the company name and id only
    // Rename the name column as label
    const newCompany = await Company.findAll({
      attributes: [["name", "label"], "id", "billingAddress"],
    });
    return res.json(newCompany);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  getOne,
  getAllNames,
};
