const express = require("express");
const contacts = require("../controllers/contact");

// Set router object from express
const router = express.Router();

router.get("/", contacts.getAll);

module.exports = router;
