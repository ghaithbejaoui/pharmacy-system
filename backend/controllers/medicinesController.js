let medicines = [
  { id: 1, name: "Paracetamol", stock: 10, expiry: "2025-12-31" },
  { id: 2, name: "Ibuprofen", stock: 5, expiry: "2025-08-15" },
];

// Get all medicines
const getAllMedicines = (req, res) => {
  res.json(medicines);
};

// Get one medicine by ID
const getMedicineById = (req, res) => {
  const id = parseInt(req.params.id);
  const med = medicines.find(m => m.id === id);
  if (!med) return res.status(404).json({ error: "Medicine not found" });
  res.json(med);
};

// Add new medicine
const addMedicine = (req, res) => {
  const { name, stock, expiry } = req.body;
  const id = medicines.length ? medicines[medicines.length - 1].id + 1 : 1;
  const newMed = { id, name, stock, expiry };
  medicines.push(newMed);
  res.status(201).json(newMed);
};

// Update medicine
const updateMedicine = (req, res) => {
  const id = parseInt(req.params.id);
  const med = medicines.find(m => m.id === id);
  if (!med) return res.status(404).json({ error: "Medicine not found" });
  const { name, stock, expiry } = req.body;
  med.name = name ?? med.name;
  med.stock = stock ?? med.stock;
  med.expiry = expiry ?? med.expiry;
  res.json(med);
};

// Delete medicine
const deleteMedicine = (req, res) => {
  const id = parseInt(req.params.id);
  medicines = medicines.filter(m => m.id !== id);
  res.json({ message: "Deleted successfully" });
};

// Sell medicine (subtract 1 from stock)
const sellMedicine = (req, res) => {
  const id = parseInt(req.params.id);
  const med = medicines.find(m => m.id === id);
  if (!med) return res.status(404).json({ error: "Medicine not found" });
  med.stock = med.stock > 0 ? med.stock - 1 : 0;
  res.json(med);
};

module.exports = {
  getAllMedicines,
  getMedicineById,  // <- export this
  addMedicine,
  updateMedicine,
  deleteMedicine,
  sellMedicine,      // <- export this
};
