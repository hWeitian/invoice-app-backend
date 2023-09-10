const { db } = require("../db/models/index");
const axios = require("axios");
const CronJob = require("cron").CronJob;
const { scrapeRates } = require("../utils/scrapeExchangeRates");
const { ExchangeRate } = db;

async function getAll(req, res) {
  try {
    const newExchangeRate = await ExchangeRate.findAll();
    return res.json(newExchangeRate);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getRate(req, res) {
  const { month, year } = req.params;
  const [newMonth, newYear] = convertDate(month, year);
  const monthFormat =
    newMonth.length === 1 ? "0" + newMonth.toString() : newMonth;
  const date = [
    `${newYear}-${monthFormat}-30`,
    `${newYear}-${monthFormat}-31`,
    `${newYear}-${monthFormat}-28`,
  ];
  try {
    const newExchangeRate = await ExchangeRate.findOne({
      where: { date: date },
    });
    return res.json(newExchangeRate);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

const convertDate = (month, year) => {
  let newMonth;
  let newYear;
  if (+month === 1) {
    newMonth = 12;
    newYear = year - 1;
  } else {
    newMonth = month - 1;
    newYear = year;
  }
  return [newMonth, newYear];
};

async function getOneLatest(req, res) {
  try {
    const newExchangeRate = await ExchangeRate.findOne({
      order: [["id", "DESC"]],
    });
    return res.json(newExchangeRate);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getTableData(req, res) {
  const { page, size } = req.params;
  try {
    const tableData = await ExchangeRate.findAndCountAll({
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["date", "DESC"]],
    });
    return res.json(tableData);
  } catch (e) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function addRate(req, res) {
  const data = req.body;

  try {
    const newRate = await ExchangeRate.create(data);
    return res.json(newRate);
  } catch (e) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateRate(req, res) {
  const data = req.body;
  const { id } = req.params;

  try {
    const updatedRate = await ExchangeRate.update(data, { where: { id: id } });
    return res.json(updatedRate);
  } catch (e) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function deleteRate(req, res) {
  const { id } = req.params;
  try {
    const deletedRate = await ExchangeRate.destroy({ where: { id: id } });
    return res.json(deletedRate);
  } catch (e) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function addRatesAutomatically(req, res) {
  try {
    const monthMap = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };

    const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);

    const year = yesterday.getFullYear();
    const month = monthMap[yesterday.getMonth()];

    const rateData = await scrapeRates("2023", "2023", "Aug", "Aug", "Monthly");
    // const rateData = await scrapeRates(year, year, month, month, "Monthly");

    const newRate = {
      date: yesterday,
      rate: rateData,
    };

    const addedRate = await ExchangeRate.create(newRate);
  } catch (err) {
    console.log(err);
  }
}

const getRates = new CronJob(
  // At 00:01 on first day of each month
  "*/5 * * * *",
  // "01 0 1 * *",
  function () {
    addRatesAutomatically();
  },
  null,
  true,
  "Singapore"
);

module.exports = {
  getAll,
  getOneLatest,
  getTableData,
  addRate,
  updateRate,
  deleteRate,
  getRate,
};
