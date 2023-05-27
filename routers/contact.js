const express = require("express");
const contacts = require("../controllers/contact");

// Set router object from express
const router = express.Router();

router.get("/", contacts.getAll);
router.get("/:companyId", contacts.getFromCompany);
router.get("/email/:email", contacts.getFromEmail);
router.get("/:page/:size", contacts.getPaginatedData);
router.get(
  "/search/company/:searchText/:page/:size",
  contacts.searchContactByCopmpany
);
router.get(
  "/search/name/:searchText/:page/:size",
  contacts.searchContactByName
);

router.put("/:adminChanged/:id", contacts.updateContact);
router.post("/", contacts.addContact);
router.delete("/:id", contacts.deleteContact);

module.exports = router;
