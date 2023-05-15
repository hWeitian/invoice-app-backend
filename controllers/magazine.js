const db = require("../db/models/index");

const { Magazine } = db;

async function getAll(req, res) {
  try {
    const newMagazine = await Magazine.findAll();
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
    const newMagazine = await Magazine.findOne({
      where: { [Op.and]: [{ month: month }, { year: year }] },
    });
    console.log(newMagazine);
    return res.json(newMagazine);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  getCurrentIssue,
};
