const db = require("../db");

// Get all sales
const getAllSales = (req, res) => {
  const q = `
    SELECT s.*, m.name AS medicine_name
    FROM sales s
    JOIN medicines m ON s.medicine_id = m.id
    ORDER BY s.sale_date DESC
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

// Add a sale + reduce medicine stock
const addSale = (req, res) => {
  const { medicine_id, quantity, total_price } = req.body;

  if (!medicine_id || !quantity || !total_price)
    return res.status(400).json({ error: "Missing fields" });

  // 1. Insert sale
  const q1 = "INSERT INTO sales (medicine_id, quantity, total_price) VALUES (?, ?, ?)";
  db.query(q1, [medicine_id, quantity, total_price], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // 2. Update stock
    const q2 = "UPDATE medicines SET stock = stock - ? WHERE id = ?";
    db.query(q2, [quantity, medicine_id], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });

      res.status(201).json({ message: "Sale added & stock updated" });
    });
  });
};

// Delete sale
const deleteSale = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM sales WHERE id = ?";

  db.query(q, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Sale deleted" });
  });
};

// Get daily revenue
const getDailyRevenue = (req, res) => {
  const q = `
    SELECT DATE(sale_date) AS day, SUM(total_price) AS revenue
    FROM sales
    GROUP BY DATE(sale_date)
    ORDER BY day DESC
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

// Get monthly revenue
const getMonthlyRevenue = (req, res) => {
  const q = `
    SELECT 
      DATE_FORMAT(sale_date, '%Y-%m') AS month,
      SUM(total_price) AS revenue
    FROM sales
    GROUP BY month
    ORDER BY month DESC
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

module.exports = {
  getAllSales,
  addSale,
  deleteSale,
  getDailyRevenue,
  getMonthlyRevenue,
};
