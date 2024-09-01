const express = require("express");
const gstRates = require("../controllers/gstRate");

// Set router object from express
const router = express.Router();

router.get("/", gstRates.getAll);
router.put("/:id", gstRates.updateGstRate);

module.exports = router;
