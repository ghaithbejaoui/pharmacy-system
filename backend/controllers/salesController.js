const db = require("../config/db");

// Get all sales
const getAllSales = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id, m.name AS medicine_name, s.quantity, s.total_price, s.sale_date 
      FROM sales s 
      JOIN medicines m ON s.medicine_id = m.id 
      ORDER BY s.sale_date DESC
    `);
    console.log("Sales fetched:", rows.length);
    res.json(rows);
  } catch (err) {
    console.error("Sales fetch error:", err);
    res.status(500).json({ error: "Failed to fetch sales" });
  }
};

// Add a sale
const addSale = async (req, res) => {
  const { medicine_id, quantity } = req.body;

  if (!medicine_id || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid sale data" });
  }

  try {
    // Get medicine price and stock
    const [medRows] = await db.query("SELECT price, stock FROM medicines WHERE id = ?", [medicine_id]);
    if (medRows.length === 0) return res.status(404).json({ error: "Medicine not found" });
    
    const medicine = medRows[0];
    if (medicine.stock < quantity) {
      return res.status(400).json({ error: `Not enough stock. Available: ${medicine.stock}` });
    }

    const total_price = Number((medicine.price * quantity).toFixed(2));

    // Insert sale with sale_date column
    const [result] = await db.query(
      "INSERT INTO sales (medicine_id, quantity, total_price, sale_date) VALUES (?, ?, ?, NOW())",
      [medicine_id, quantity, total_price]
    );

    // Reduce stock
    await db.query("UPDATE medicines SET stock = stock - ? WHERE id = ?", [quantity, medicine_id]);

    console.log("Sale added successfully. ID:", result.insertId, "Total:", total_price);
    res.status(201).json({ message: "Sale recorded", total_price });
  } catch (err) {
    console.error("Add sale error:", err);
    res.status(500).json({ error: "Failed to record sale: " + err.message });
  }
};

// Delete sale (optional)
const deleteSale = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM sales WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Sale not found" });
    res.json({ message: "Sale deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

module.exports = {
  getAllSales,
  addSale,
  deleteSale,
};