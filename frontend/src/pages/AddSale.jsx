import { useEffect, useState } from "react";
import { getMedicines } from "../services/medicineService";
import { addSale } from "../services/salesService";
import { useNavigate } from "react-router-dom";
import "../styles/addSale.css";

const AddSale = () => {
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const res = await getMedicines();
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load medicines");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selected || quantity <= 0) {
      alert("Invalid input!");
      return;
    }

    try {
      await addSale({
        medicine_id: selected,
        quantity
      });

      alert("Sale recorded!");
      navigate("/sales");

    } catch (err) {
      console.error(err);
      alert("Failed to add sale");
    }
  };

  return (
    <div className="add-sale-container">
      <h2>Add Sale</h2>

      <form className="add-sale-form" onSubmit={handleSubmit}>
        <label>Medicine:</label>
        <select 
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          required
        >
          <option value="">-- Select Medicine --</option>
          {medicines.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} — {m.price} TND — Stock: {m.stock}
            </option>
          ))}
        </select>

        <label>Quantity:</label>
        <input 
          type="number" 
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">Add Sale</button>
      </form>
    </div>
  );
};

export default AddSale;
