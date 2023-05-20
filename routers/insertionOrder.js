const express = require("express");
const insertionOrders = require("../controllers/insertionOrder");

// Set router object from express
const router = express.Router();

router.get("/", insertionOrders.getAll);
router.get("/table-data/:page/:size", insertionOrders.getTableData);
router.get("/invoice-data", insertionOrders.getDataForInvoice);

// Insert an empty row to get insertion order number
router.post("/", insertionOrders.insertEmptyRow);

// Update a record
router.put("/:id", insertionOrders.updateRow);
router.put("/status/:id", insertionOrders.updateStatus);

module.exports = router;
