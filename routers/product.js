const express = require("express");
const products = require("../controllers/product");

// Set router object from express
const router = express.Router();

router.get("/", products.getAll);

module.exports = router;
