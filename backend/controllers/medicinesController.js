const db = require("../config/db");

// Get all medicines
const getAllMedicines = (req, res) => {
  db.query("SELECT * FROM medicines", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get one medicine by ID
const getMedicineById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM medicines WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: "Medicine not found" });
    res.json(results[0]);
  });
};

// Add new medicine
const addMedicine = (req, res) => {
  const { name, stock, expiry } = req.body;

  db.query(
    "INSERT INTO medicines (name, stock, expiry) VALUES (?, ?, ?)",
    [name, stock, expiry],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.status(201).json({
        id: result.insertId,
        name,
        stock,
        expiry
      });
    }
  );
};

// Update medicine
const updateMedicine = (req, res) => {
  const id = req.params.id;
  const { name, stock, expiry } = req.body;

  db.query(
    "UPDATE medicines SET name=?, stock=?, expiry=? WHERE id=?",
    [name, stock, expiry, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ id, name, stock, expiry });
    }
  );
};

// Delete medicine
const deleteMedicine = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM medicines WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Deleted successfully" });
  });
};

// Sell (reduce stock by 1)
const sellMedicine = (req, res) => {
  const id = req.params.id;

  db.query(
    "UPDATE medicines SET stock = stock - 1 WHERE id = ? AND stock > 0",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ message: "Sold one unit" });
    }
  );
};

module.exports = {
  getAllMedicines,
  getMedicineById,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  sellMedicine
};
