const express = require("express");
const router = express.Router();
const {
  getTestPointsByCML,
  addTestPoint,
  updateTestPoint,
  deleteTestPoint,
} = require("../controllers/testPointController");

// Routes
router.get("/:line_number/:cml_number", getTestPointsByCML);
router.post("/", addTestPoint);
router.put("/:line_number/:cml_number/:tp_number", updateTestPoint);
router.delete("/:line_number/:cml_number/:tp_number", deleteTestPoint);

module.exports = router;
