const express = require("express");
const exchangeRates = require("../controllers/exchangeRate");

// Set router object from express
const router = express.Router();

router.get("/", exchangeRates.getAll);

module.exports = router;
