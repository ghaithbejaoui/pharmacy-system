// backend/controllers/medicinesController.js
import db from "../config/db.js";

// GET all medicines
export const getAllMedicines = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM medicines ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

// GET one medicine
export const getMedicineById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM medicines WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Medicine not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ADD new medicine
export const addMedicine = async (req, res) => {
  const { name, stock, price, expiry } = req.body;

  // CRITICAL: Proper validation + conversion
  if (!name || !stock || !price || !expiry) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const priceNum = parseFloat(price);
  const stockNum = parseInt(stock);

  if (isNaN(priceNum) || priceNum < 0) {
    return res.status(400).json({ error: "Invalid price" });
  }
  if (isNaN(stockNum) || stockNum < 0) {
    return res.status(400).json({ error: "Invalid stock" });
  }

  try {
    await db.query(
      "INSERT INTO medicines (name, stock, price, expiry) VALUES (?, ?, ?, ?)",
      [name.trim(), stockNum, priceNum, expiry]
    );
    res.status(201).json({ message: "Medicine added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add medicine" });
  }
};

// UPDATE medicine
export const updateMedicine = async (req, res) => {
  const { name, stock, price, expiry } = req.body;
  const { id } = req.params;

  const priceNum = parseFloat(price);
  const stockNum = parseInt(stock);

  if (!name || isNaN(priceNum) || isNaN(stockNum) || !expiry) {
    return res.status(400).json({ error: "Invalid data" });
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
    console.error(err);
    res.status(500).json({ error: "Failed to update" });
  }
};

// DELETE medicine
export const deleteMedicine = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM medicines WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    res.json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};