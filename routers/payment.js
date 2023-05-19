const express = require("express");
const payments = require("../controllers/payment");

// Set router object from express
const router = express.Router();

router.get("/", payments.getAll);
router.get("/:id", payments.getForOneInvoice);
router.post("/", payments.addOne);

module.exports = router;
