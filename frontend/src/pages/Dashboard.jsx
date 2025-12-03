// src/pages/Dashboard.jsx
import { useEffect, useState, useContext } from "react";
import { getMedicines } from "../services/medicineService";
import { getSales } from "../services/salesService";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import "../styles/dashboard.css";
import { FaPills, FaExclamationTriangle, FaBoxOpen, FaMoneyBillWave, FaChartLine, FaClock, FaCalendarDay } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { isDark } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalMedicines: 0,
    lowStock: 0,
    expired: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    bestSeller: "None",
    bestSellerQty: 0,
  });
  const [recentSales, setRecentSales] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const fetchAllData = async () => {
    try {
      const [medRes, salesRes] = await Promise.all([getMedicines(), getSales()]);
      const medicines = medRes.data;
      const sales = salesRes.data;

      // Basic stats
      const totalMedicines = medicines.length;
      const lowStock = medicines.filter(m => m.stock < 10).length;
      const expired = medicines.filter(m => new Date(m.expiry) < new Date()).length;

      // Revenue
      const totalRevenue = sales.reduce((sum, s) => sum + Number(s.total_price), 0).toFixed(2);
      const today = new Date().toISOString().slice(0, 10);
      const todayRevenue = sales
        .filter(s => s.sale_date?.slice(0, 10) === today)
        .reduce((sum, s) => sum + Number(s.total_price), 0)
        .toFixed(2);

      // Best seller
      const salesByMed = sales.reduce((acc, s) => {
        acc[s.medicine_name] = (acc[s.medicine_name] || 0) + s.quantity;
        return acc;
      }, {});
      const best = Object.entries(salesByMed).sort((a, b) => b[1] - a[1])[0] || ["None", 0];

      // Recent sales
      const recent = sales.slice(0, 7);

      // Chart data (last 7 days)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().slice(0, 10);
      }).reverse();

      const dailyRevenue = last7Days.map(day => {
        return sales
          .filter(s => s.sale_date?.slice(0, 10) === day)
          .reduce((sum, s) => sum + Number(s.total_price), 0);
      });

      setChartData({
        labels: last7Days.map(d => new Date(d).toLocaleDateString("en", { weekday: "short" })),
        datasets: [{
          label: "Daily Revenue (TND)",
          data: dailyRevenue,
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          tension: 0.4,
          fill: true,
        }]
      });

      setStats({ totalMedicines, lowStock, expired, totalRevenue, todayRevenue, bestSeller: best[0], bestSellerQty: best[1] });
      setRecentSales(recent);
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 10000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: "Total Medicines", value: stats.totalMedicines, icon: <FaPills />, color: "#4f46e5" },
    { title: "Low Stock (<10)", value: stats.lowStock, icon: <FaExclamationTriangle />, color: "#f97316" },
    { title: "Expired", value: stats.expired, icon: <FaBoxOpen />, color: "#ef4444" },
    { title: "Total Revenue", value: `${stats.totalRevenue} TND`, icon: <FaMoneyBillWave />, color: "#10b981" },
    { title: "Today's Revenue", value: `${stats.todayRevenue} TND`, icon: <FaCalendarDay />, color: "#06b6d4" },
    { title: "Best Seller", value: `${stats.bestSeller} (${stats.bestSellerQty})`, icon: <FaChartLine />, color: "#8b5cf6" },
  ];

  return (
    <div >
    <div className="main-content">
      <h2 style={{ marginBottom: "20px", fontSize: "28px" }}>Pharmacy Dashboard</h2>

      {/* KPI Cards */}
      <div className="cards-grid">
        {cards.map((card, i) => (
          <Card key={i} title={card.title} value={card.value} icon={card.icon} color={card.color} />
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="chart-container">
        <h3>Revenue Last 7 Days</h3>
        <div className="chart-wrapper">
          <Line data={chartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: isDark ? 'white' : '#1f2937'
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  color: isDark ? 'white' : '#6b7280'
                },
                grid: {
                  color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }
              },
              y: {
                ticks: {
                  color: isDark ? 'white' : '#6b7280'
                },
                grid: {
                  color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }
              }
            }
          }} />
        </div>
      </div>

      {/* Recent Sales */}
      <div className="table-container">
        <h3>Recent Sales</h3>
        {recentSales.length === 0 ? (
          <p>No sales yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Medicine</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Qty</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Total</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map(s => (
                <tr key={s.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px" }}>{s.medicine_name}</td>
                  <td style={{ padding: "12px" }}>{s.quantity}</td>
                  <td style={{ padding: "12px" }}>{s.total_price} TND</td>
                  <td style={{ padding: "12px" }}>{new Date(s.sale_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;