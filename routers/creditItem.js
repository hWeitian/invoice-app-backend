const express = require("express");
const creditItems = require("../controllers/creditItem");

// Set router object from express
const router = express.Router();

router.get("/", creditItems.getAll);

module.exports = router;
