import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMedicineById, updateMedicine } from "../services/medicineService";
import { AuthContext } from "../context/AuthContext";
import "../styles/addMedicine.css"; // reuse AddMedicine styling

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [expiry, setExpiry] = useState("");
  const { setToast } = useContext(AuthContext);

  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const res = await getMedicineById(id);
      setName(res.data.name);
      setStock(res.data.stock);
      setPrice(res.data.price);
      setExpiry(res.data.expiry);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock);

    if (!name || !stock || !expiry || isNaN(priceNum)) {
      return alert("Please fill all fields correctly");
    }

    try {
      await updateMedicine(id, {
        name,
        stock: stockNum,
        price: priceNum,   // ← this was the bug!
        expiry
      });
      setToast("Medicine updated successfully!");
      setTimeout(() => setToast(""), 4000);
      navigate("/medicines");
    } catch (err) {
      setToast("Failed to update medicine");
      setTimeout(() => setToast(""), 4000);
    }
  };

  return (
    <div >
    <div className="add-medicine-container">
      <h2>Edit Medicine</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Stock</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />

        <label>price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Expiry Date</label>
        <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />

        <button type="submit">Update Medicine</button>
      </form>
    </div>
    </div>
  );
};

export default EditMedicine;
