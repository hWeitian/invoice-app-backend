const express = require("express");
const magazines = require("../controllers/magazine");

// Set router object from express
const router = express.Router();

router.get("/", magazines.getAll);
router.get("/current-issue", magazines.getCurrentIssue);

module.exports = router;
