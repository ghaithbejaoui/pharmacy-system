import { useEffect, useState } from "react";
import { getMedicines, deleteMedicine, sellMedicine } from "../services/medicineService";
import { useNavigate } from "react-router-dom";
import "../styles/medicines.css";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await getMedicines();
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch medicines. Check backend server!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedicine(id);
      fetchMedicines();
    } catch (err) {
      console.error(err);
      alert("Failed to delete medicine!");
    }
  };

  const handleSell = async (id) => {
    console.log("Sell clicked for id:", id);
    try {
      await sellMedicine(id);
      fetchMedicines();
    } catch (err) {
      console.error("Sell failed:", err);
      alert("Failed to sell medicine!");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const isLowStock = (stock) => stock <= 5;
  const isNearExpiry = (expiry) => {
    const today = new Date();
    const expiryDate = new Date(expiry);
    const diffDays = (expiryDate - today) / (1000 * 3600 * 24);
    return diffDays <= 30;
  };

  return (
    <div className="medicines-container">
      <h2>Medicines</h2>
      <table className="medicines-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr
              key={med.id}
              className={`${isLowStock(med.stock) ? "low-stock" : ""} ${
                isNearExpiry(med.expiry) ? "near-expiry" : ""
              }`}
            >
              <td>{med.id}</td>
              <td>{med.name}</td>
              <td>{med.stock}</td>
              <td>{med.expiry}</td>
              <td>
                <button
                  className="sell-btn"
                  onClick={() => handleSell(med.id)}
                >
                  Sell
                </button>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(med.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(med.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicines;
