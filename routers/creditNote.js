const express = require("express");
const creditNotes = require("../controllers/creditNote");

// Set router object from express
const router = express.Router();

router.get("/", creditNotes.getAll);

module.exports = router;
