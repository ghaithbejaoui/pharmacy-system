import "../styles/card.css";

const Card = ({ title, value, icon, color }) => {
  return (
    <div className="card" style={{ borderTop: `5px solid ${color}`, '--card-color': color }}>
      <div className="card-icon">{icon}</div>
      <div className="card-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Card;
