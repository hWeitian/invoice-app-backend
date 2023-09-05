const { db } = require("../db/models/index");
const axios = require("axios");
const CronJob = require("cron").CronJob;

const { ExchangeRate } = db;

async function getAll(req, res) {
  try {
    const newExchangeRate = await ExchangeRate.findAll();
    return res.json(newExchangeRate);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

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
      order: [["createdAt", "DESC"]],
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
    const rateData = await axios.get(
      "https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=95932927-c8bc-4e7a-b484-68a66a24edfe&limit=1&fields=usd_sgd,end_of_day&sort=end_of_day%20desc"
    );
    const newRate = {
      date: new Date(rateData.data.result.records[0]["end_of_day"]),
      rate: rateData.data.result.records[0]["usd_sgd"],
    };

    const addedRate = await ExchangeRate.create(newRate);
  } catch (err) {
    console.log(err);
  }
}

const getRates = new CronJob(
  "00 01 00 * * *",
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
};
