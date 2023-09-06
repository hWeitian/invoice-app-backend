const express = require("express");
const exchangeRates = require("../controllers/exchangeRate");

// Set router object from express
const router = express.Router();

router.get("/", exchangeRates.getAll);
router.get("/latest/:month/:year", exchangeRates.getRate);
router.get("/:page/:size", exchangeRates.getTableData);
router.post("/", exchangeRates.addRate);
router.put("/:id", exchangeRates.updateRate);
router.delete("/:id", exchangeRates.deleteRate);

module.exports = router;
