// frontend/src/pages/Medicines.jsx
import { useEffect, useState, useContext } from "react";
import { getMedicines, deleteMedicine } from "../services/medicineService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/medicines.css";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const { setToast } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await getMedicines();
      setMedicines(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load medicines.check backend server");
    }
  };

  const handleDelete = async (id) => {
    const medicine = medicines.find(m => m.id === id);
    if (!confirm("Delete this medicine?")) return;
    try {
      await deleteMedicine(id);
      setToast(`${medicine.name} deleted successfully!`);
      setTimeout(() => setToast(""), 4000);
      fetchMedicines();
    } catch (err) {
      setToast("Delete failed");
      setTimeout(() => setToast(""), 4000);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // SELL BUTTON NOW GOES TO ADD SALE PAGE
  const handleSell = (id) => {
    navigate(`/add-sale?medicine=${id}`);
  };

  const isLowStock = (stock) => stock <= 5;
  const isNearExpiry = (expiry) => {
    const diffDays = (new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  };

  return (
    <div >
    <div className="medicines-container">
      <h2>Medicines</h2>
      <button onClick={() => navigate("/add")} style={{ marginBottom: "20px", padding: "10px 20px", background: "#4f46e5", color: "white", border: "none", borderRadius: "8px" }}>
        + Add New Medicine
      </button>

      <table className="medicines-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>No medicines yet. Add one!</td></tr>
          ) : (
            medicines.map((med) => (
              <tr
                key={med.id}
                className={`${isLowStock(med.stock) ? "low-stock" : ""} ${isNearExpiry(med.expiry) ? "near-expiry" : ""}`}
              >
                <td>{med.id}</td>
                <td>{med.name}</td>
                <td>{med.stock}</td>
                <td>{med.price} TND</td>
                <td>{new Date(med.expiry).toLocaleDateString()}</td>
                <td>
                  <button className="sell-btn" onClick={() => handleSell(med.id)}>Sell</button>
                  <button className="edit-btn" onClick={() => handleEdit(med.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(med.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Medicines;