const express = require("express");
const magazines = require("../controllers/magazine");

// Set router object from express
const router = express.Router();

router.get("/", magazines.getAll);

module.exports = router;
