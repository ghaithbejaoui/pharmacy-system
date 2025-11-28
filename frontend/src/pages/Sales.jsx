import { useEffect, useState } from "react";
import { getSales } from "../services/salesService";
import "../styles/sales.css";

const Sales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await getSales();
      setSales(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch sales!");
    }
  };

  return (
    <div className="sales-container">
      <h2>Sales</h2>

      <table className="sales-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.medicine_name}</td>
              <td>{sale.quantity}</td>
              <td>{sale.total_price} TND</td>
              <td>{new Date(sale.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
