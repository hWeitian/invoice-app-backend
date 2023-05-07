const express = require("express");
const orders = require("../controllers/order");

// Set router object from express
const router = express.Router();

router.get("/", orders.getAll);

module.exports = router;
