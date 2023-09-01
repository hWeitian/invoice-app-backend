const express = require("express");
const insertionOrders = require("../controllers/insertionOrder");

// Set router object from express
const router = express.Router();

router.get("/", insertionOrders.getAll);
router.get("/table-data/:page/:size", insertionOrders.getTableData);
router.get("/invoice-data", insertionOrders.getDataForInvoice);
router.get(
  "/search/company/:searchText/:page/:size",
  insertionOrders.searchIoByCopmpany
);
router.get("/search/id/:searchText/:page/:size", insertionOrders.searchIoById);

// Insert an empty row to get insertion order number
// router.post("/", insertionOrders.insertEmptyRow);
router.get("/latest", insertionOrders.getLatestIoNum);

// Update a record
router.put("/:id", insertionOrders.updateRow);
router.put("/status/:id", insertionOrders.updateStatus);

module.exports = router;
