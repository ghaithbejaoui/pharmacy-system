import { useEffect, useState } from "react";
import { getMedicines } from "../services/medicineService";
import Card from "../components/Card";
import "../styles/dashboard.css";
import { FaPills, FaExclamationTriangle, FaBoxOpen } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    lowStock: 0,
    expired: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getMedicines();
      const medicines = res.data;

      const total = medicines.length;
      const lowStock = medicines.filter(m => m.stock < 10).length;
      const expired = medicines.filter(m => new Date(m.expiry) < new Date()).length;

      setStats({ total, lowStock, expired });
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    { title: "Total Medicines", value: stats.total, icon: <FaPills />, color: "#4f46e5" },
    { title: "Low Stock", value: stats.lowStock, icon: <FaExclamationTriangle />, color: "#f97316" },
    { title: "Expired Medicines", value: stats.expired, icon: <FaBoxOpen />, color: "#ef4444" },
  ];

  return (
    <div className="main-content">
 
      <h2>Dashboard</h2>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
