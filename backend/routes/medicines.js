const express = require("express");
const router = express.Router();
const {
  getAllMedicines,
  getMedicineById,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicinesController");

router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);          // <-- get one medicine
router.post("/", addMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);
      // <-- sell medicine

module.exports = router;