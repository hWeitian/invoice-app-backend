const db = require("../db/models/index");
const { Op } = require("sequelize");

const { Magazine } = db;

async function getAll(req, res) {
  try {
    const newMagazine = await Magazine.findAll({
      order: [["id", "DESC"]],
    });
    return res.json(newMagazine);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getPaginatedData(req, res) {
  const { page, size } = req.params;
  try {
    const newMagazine = await Magazine.findAndCountAll({
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["id", "DESC"]],
    });
    return res.json(newMagazine);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

function getCurrentIssueMonth(month) {
  let monthString;
  if (month === 0 || month === 1 || month === 2) {
    monthString = "March";
  } else if (month === 3 || month === 4 || month === 5) {
    monthString = "June";
  } else if (month === 6 || month === 7 || month === 8) {
    monthString = "September";
  } else if (month === 9 || month === 10 || month === 11) {
    monthString = "December";
  }
  return monthString;
}

async function getCurrentIssue(req, res) {
  const date = new Date();
  const month = getCurrentIssueMonth(date.getMonth());
  const year = date.getFullYear();
  try {
    const newMagazine = await Magazine.findAll({
      where: { [Op.and]: [{ month: month }, { year: year }] },
    });
    return res.json(newMagazine);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function addIssue(req, res) {
  const newData = req.body;
  try {
    const newMagazine = await Magazine.create(newData);
    return res.json(newMagazine);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateIssue(req, res) {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedMagazine = await Magazine.update(newData, {
      where: { id: id },
    });
    return res.json(updatedMagazine);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function deleteIssue(req, res) {
  const { id } = req.params;
  try {
    const deletedMagazine = await Magazine.destroy({
      where: { id: id },
    });
    return res.json(deletedMagazine);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  getCurrentIssue,
  updateIssue,
  addIssue,
  getPaginatedData,
  deleteIssue,
};
