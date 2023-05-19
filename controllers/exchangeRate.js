const db = require("../db/models/index");
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
      order: [["date", "DESC"]],
    });
    return res.json(newExchangeRate);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function addRates(req, res) {
  try {
    const rateData = await axios.get(
      "https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=95932927-c8bc-4e7a-b484-68a66a24edfe&limit=1&fields=usd_sgd,end_of_day&sort=end_of_day%20desc"
    );
    const newRate = {
      date: new Date(rateData.data.result.records[0]["end_of_day"]),
      rate: rateData.data.result.records[0]["usd_sgd"],
    };

    const addedRate = await ExchangeRate.create(newRate);

    // return res.json(newExchangeRate);
  } catch (err) {
    console.log(err);
    // return res.status(400).json({ error: true, msg: err });
  }
}

const getRates = new CronJob(
  "00 01 00 * * *",
  function () {
    addRates();
    console.log("You will see this message every midnight at 12:01pm");
  },
  null,
  true,
  "Singapore"
);

module.exports = {
  getAll,
  getOneLatest,
};
