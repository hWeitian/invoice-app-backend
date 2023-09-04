const express = require("express");
const invoices = require("../controllers/invoice");

// Set router object from express
const router = express.Router();

router.get("/", invoices.getAll);
// Get the latest inv number
router.get("/latest-number", invoices.getLatestInvNum);

router.get("/table-data/:page/:size", invoices.getTableData);
router.get("/:companyId", invoices.getAllFromCompany);
router.get(
  "/search/company/:searchText/:page/:size",
  invoices.searchInvoiceByCopmpany
);
router.get("/search/id/:searchText/:page/:size", invoices.searchInvoiceById);

router.post("/add-empty", invoices.insertEmptyRow);
router.put("/:id", invoices.updateRow);

module.exports = router;
