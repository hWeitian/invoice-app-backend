const express = require("express");
const companies = require("../controllers/company");

// Set router object from express
const router = express.Router();

router.get("/", companies.getAll);
router.get("/:id", companies.getOne);

module.exports = router;
