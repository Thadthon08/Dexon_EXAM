const express = require("express");
const router = express.Router();
const thicknessController = require("../controllers/thicknessController");

router.get(
  "/:lineNumber/:cmlNumber/:tpNumber",
  thicknessController.getThicknessByLineCMLAndTPNumber
);

router.post("/", thicknessController.addThickness);

// router.put(
//   "/:lineNumber/:cmlNumber/:tpNumber",
//   thicknessController.updateThickness
// );

// router.delete(
//   "/:lineNumber/:cmlNumber/:tpNumber/:inspectionDate",
//   thicknessController.deleteThickness
// );

router.put("/:id", thicknessController.updateThickness);
router.delete("/:id", thicknessController.deleteThickness);
router.get("/:id", thicknessController.getThicknessById);

module.exports = router;
