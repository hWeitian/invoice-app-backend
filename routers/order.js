const express = require("express");
const orders = require("../controllers/order");

// Set router object from express
const router = express.Router();

router.get("/", orders.getAll);
router.post("/", orders.addOrders);
router.put("/", orders.addOrUpdate);

module.exports = router;
