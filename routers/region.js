const express = require("express");
const regions = require("../controllers/region");

// Set router object from express
const router = express.Router();

router.get("/", regions.getAll);

module.exports = router;
