const express = require("express");
const contacts = require("../controllers/contact");

// Set router object from express
const router = express.Router();

router.get("/", contacts.getAll);
router.get("/:companyId", contacts.getFromCompany);
router.get("/email/:email", contacts.getFromEmail);

module.exports = router;
