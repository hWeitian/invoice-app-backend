const express = require("express");
const magazines = require("../controllers/magazine");

// Set router object from express
const router = express.Router();

router.get("/", magazines.getAll);
router.get("/current-issue", magazines.getCurrentIssue);
router.get("/:page/:size", magazines.getPaginatedData);
router.put("/:id", magazines.updateIssue);
router.post("/", magazines.addIssue);
router.delete("/:id", magazines.deleteIssue);

module.exports = router;
