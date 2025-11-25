const express = require("express");
const router = express.Router();
const {
  getAllMedicines,
  getMedicineById,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  sellMedicine,
} = require("../controllers/medicinesController");

router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);          // <-- get one medicine
router.post("/", addMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);
router.post("/:id/sell", sellMedicine);      // <-- sell medicine

module.exports = router;
