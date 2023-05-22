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

async function getPaginatedData(req, res) {
  const { page, size } = req.params;
  try {
    const comapnies = await Company.findAndCountAll({
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["id", "ASC"]],
    });
    return res.json(comapnies);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function addCompany(req, res) {
  const newData = req.body;
  try {
    const newCompany = await Company.create(newData);
    return res.json(newCompany);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateCompany(req, res) {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedCompany = await Company.update(newData, {
      where: { id: id },
    });
    return res.json(updatedCompany);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function deleteCompany(req, res) {
  const { id } = req.params;
  try {
    const deletedCompany = await Company.destroy({
      where: { id: id },
    });
    return res.json(deletedCompany);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  getOne,
  getAllNames,
  getPaginatedData,
  addCompany,
  updateCompany,
  deleteCompany,
};
