const express = require("express");
const invoices = require("../controllers/invoice");

// Set router object from express
const router = express.Router();

router.get("/", invoices.getAll);
router.get("/table-data", invoices.getTableData);
router.get("/:companyId", invoices.getAllFromCompany);

router.post("/add-empty", invoices.insertEmptyRow);
router.put("/:id", invoices.updateRow);

module.exports = router;
