const express = require("express");
const router = express.Router();
const {
  getAllInfo,
  getInfoByLineNumber,
  addInfo,
  updateInfo,
  deleteInfo,
} = require("../controllers/infoController");

router.get("/", getAllInfo);
router.get("/:line_number", getInfoByLineNumber);
router.post("/", addInfo);
router.put("/:line_number", updateInfo);
router.delete("/:line_number", deleteInfo);
module.exports = router;
