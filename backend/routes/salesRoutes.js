const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

router.get("/", salesController.getAllSales);
router.post("/", salesController.addSale);
router.delete("/:id", salesController.deleteSale);

router.get("/stats/daily", salesController.getDailyRevenue);
router.get("/stats/monthly", salesController.getMonthlyRevenue);

module.exports = router;
