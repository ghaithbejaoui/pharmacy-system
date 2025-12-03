import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/medicines.css"; // reuse styles

const Profile = () => {
  const { user, setToast } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    email: user?.email || "",
    nickname: user?.nickname || "",
  });

  const handleSave = () => {
    // For now, just show a message since we don't have update own profile endpoint
    setToast("Profile update feature coming soon!");
    setTimeout(() => setToast(""), 4000);
    setEditMode(false);
  };

  const handleCancel = () => {
    setForm({
      email: user?.email || "",
      nickname: user?.nickname || "",
    });
    setEditMode(false);
  };

  return (
    <div>
      <div className="medicines-container">
        <h2>My Profile</h2>

        <div className="profile-card" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", background: "#f9fafb", borderRadius: "8px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{
              width: "100px",
              height: "100px",
              background: "#6366f1",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: "bold",
              margin: "0 auto 20px"
            }}>
              {user?.name?.[0] || user?.nickname?.[0] || "U"}
            </div>
            <h3>{user?.name || "User"}</h3>
            <p style={{ color: "#6b7280" }}>{user?.role}</p>
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Email</label>
              {editMode ? (
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
                />
              ) : (
                <div className="profile-field" style={{ padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px" }}>
                  {user?.email}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Nickname</label>
              {editMode ? (
                <input
                  type="text"
                  value={form.nickname}
                  onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
                />
              ) : (
                <div className="profile-field" style={{ padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px" }}>
                  {user?.nickname || "Not set"}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Role</label>
              <div className="profile-field" style={{ padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: "6px" }}>
                {user?.role}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              {editMode ? (
                <>
                  <button onClick={handleSave} style={{ padding: "10px 20px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                    Save Changes
                  </button>
                  <button onClick={handleCancel} style={{ padding: "10px 20px", background: "#6b7280", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)} style={{ padding: "10px 20px", background: "#6366f1", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;