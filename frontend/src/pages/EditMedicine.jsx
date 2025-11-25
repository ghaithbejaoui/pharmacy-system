import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMedicineById, updateMedicine } from "../services/medicineService";
import "../styles/addMedicine.css"; // reuse AddMedicine styling

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const res = await getMedicineById(id);
      setName(res.data.name);
      setStock(res.data.stock);
      setExpiry(res.data.expiry);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !stock || !expiry) return alert("Please fill all fields");

    await updateMedicine(id, { name, stock, expiry });
    navigate("/medicines");
  };

  return (
    <div className="add-medicine-container">
      <h2>Edit Medicine</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Stock</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />

        <label>Expiry Date</label>
        <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />

        <button type="submit">Update Medicine</button>
      </form>
    </div>
  );
};

export default EditMedicine;
