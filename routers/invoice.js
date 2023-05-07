const express = require("express");
const invoices = require("../controllers/invoice");

// Set router object from express
const router = express.Router();

router.get("/", invoices.getAll);

module.exports = router;
