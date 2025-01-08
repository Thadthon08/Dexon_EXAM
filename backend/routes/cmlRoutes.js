const express = require("express");
const router = express.Router();
const {
  getCMLByLineNumber,
  addCML,
  updateCML,
  deleteCML,
} = require("../controllers/cmlController");

router.get("/:line_number", getCMLByLineNumber);
router.post("/", addCML);
router.put("/:lineNumber/:cmlNumber", updateCML);
router.delete("/:lineNumber/:cmlNumber", deleteCML);

module.exports = router;
