const express = require("express");
const orderRegions = require("../controllers/orderRegion");

// Set router object from express
const router = express.Router();

router.get("/", orderRegions.getAll);

module.exports = router;
