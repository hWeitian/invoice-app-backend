const db = require("../db/models/index");

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

module.exports = {
  getAll,
  getOneLatest,
};
