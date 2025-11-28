const express = require("express");
const router = express.Router();
const { getAllSales, addSale, deleteSale } = require("../controllers/salesController");

router.get("/", getAllSales);      // ← correct name
router.post("/", addSale);
router.delete("/:id", deleteSale);

module.exports = router;