const db = require("../config/db");

// GET all medicines
const getAllMedicines = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM medicines ORDER BY id DESC");
    console.log("Medicines fetched:", rows.length); // ← ADD THIS FOR DEBUG
    res.json(rows);
  } catch (err) {
    console.error("Medicines fetch error:", err);
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

// GET one medicine
const getMedicineById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM medicines WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Medicine not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Medicine fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ADD new medicine
const addMedicine = async (req, res) => {
  const { name, stock, price, expiry } = req.body;

  const priceNum = parseFloat(price);
  const stockNum = parseInt(stock, 10);

  console.log("Add medicine input:", { name, stockNum, priceNum, expiry }); // ← DEBUG

  if (!name || name.trim() === "") return res.status(400).json({ error: "Name is required" });
  if (isNaN(stockNum) || stockNum < 0) return res.status(400).json({ error: "Valid stock is required" });
  if (isNaN(priceNum) || priceNum < 0) return res.status(400).json({ error: "Valid price is required" });
  if (!expiry) return res.status(400).json({ error: "Expiry date is required" });

  try {
    const [result] = await db.query(
      "INSERT INTO medicines (name, stock, price, expiry) VALUES (?, ?, ?, ?)",
      [name.trim(), stockNum, priceNum, expiry]
    );
    console.log("Medicine added, ID:", result.insertId); // ← DEBUG
    res.status(201).json({ message: "Medicine added successfully", id: result.insertId });
  } catch (err) {
    console.error("Add medicine DB error:", err);
    res.status(500).json({ error: "Failed to add medicine: " + err.message });
  }
};

// UPDATE medicine
const updateMedicine = async (req, res) => {
  const { id } = req.params;
  const { name, stock, price, expiry } = req.body;
  const priceNum = parseFloat(price);
  const stockNum = parseInt(stock, 10);

  if (!name || isNaN(stockNum) || isNaN(priceNum) || !expiry) {
    return res.status(400).json({ error: "All fields are required and must be valid" });
  }

  try {
    const [result] = await db.query(
      "UPDATE medicines SET name = ?, stock = ?, price = ?, expiry = ? WHERE id = ?",
      [name.trim(), stockNum, priceNum, expiry, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json({ message: "Medicine updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update: " + err.message });
  }
};

// DELETE medicine
const deleteMedicine = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM medicines WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    res.json({ message: "Medicine deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Delete failed: " + err.message });
  }
};

module.exports = {
  getAllMedicines,
  getMedicineById,
  addMedicine,
  updateMedicine,
  deleteMedicine,
};