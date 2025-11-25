import { useState } from "react";
import { addMedicine } from "../services/medicineService";
import { useNavigate } from "react-router-dom";
import "../styles/addMedicine.css";

const AddMedicine = () => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [expiry, setExpiry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !stock || !expiry) return alert("Please fill all fields");

    await addMedicine({ name, stock, expiry });
    navigate("/medicines"); // go back to medicines page
  };

  return (
    <div className="add-medicine-container">
      <h2>Add New Medicine</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <label>Expiry Date</label>
        <input
          type="date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
