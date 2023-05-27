const express = require("express");
const companies = require("../controllers/company");

// Set router object from express
const router = express.Router();

router.get("/", companies.getAll);
router.get("/names", companies.getAllNames);
router.get("/:id", companies.getOne);
router.get("/:page/:size", companies.getPaginatedData);
router.get("/search/:searchText/:page/:size", companies.searchByName);

router.put("/:id", companies.updateCompany);
router.post("/", companies.addCompany);
router.delete("/:id", companies.deleteCompany);

module.exports = router;
