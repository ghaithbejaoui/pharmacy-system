// src/pages/AddMedicine.jsx
import { useState, useContext } from "react";
import { addMedicine } from "../services/medicineService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/addMedicine.css";

const AddMedicine = () => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");   // ← keep as string in input
  const [expiry, setExpiry] = useState("");
  const { setToast } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert to correct types before sending
    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock);

    if (!name || !stock || !price || !expiry) {
      return alert("Please fill all fields");
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      return alert("Please enter a valid price");
    }
    if (isNaN(stockNum) || stockNum < 0) {
      return alert("Please enter a valid stock");
    }

    try {
      await addMedicine({
        name,
        stock: stockNum,
        price: priceNum,       // ← now a real number!
        expiry
      });
      setToast("Medicine added successfully!");
      setTimeout(() => setToast(""), 4000);
      navigate("/medicines");
    } catch (err) {
      setToast("Failed to add medicine");
      setTimeout(() => setToast(""), 4000);
    }
  };

  return (
    <div >
      <div className="add-medicine-container">
        <h2>Add New Medicine</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Stock</label>
          <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required />

          <label>Price (TND)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label>Expiry Date</label>
          <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />

          <button type="submit">Add Medicine</button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;