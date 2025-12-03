import { useState, useEffect, useContext } from "react";
import { registerUser, getUsers, deleteUser, updateUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "../styles/medicines.css"; // reuse styles

const Users = () => {
  const { user, setToast } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    role: "pharmacist"
  });
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    email: "",
    nickname: "",
    role: "pharmacist"
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setToast("Failed to load users");
      setTimeout(() => setToast(""), 4000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form.email, form.nickname, form.password, form.role);
      setToast("User created successfully!");
      setTimeout(() => setToast(""), 4000);
      setForm({ email: "", nickname: "", password: "", role: "pharmacist" });
      fetchUsers();
    } catch (err) {
      setToast(err.message);
      setTimeout(() => setToast(""), 4000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setToast("User deleted successfully!");
      setTimeout(() => setToast(""), 4000);
      fetchUsers();
    } catch (err) {
      setToast(err.message);
      setTimeout(() => setToast(""), 4000);
    }
  };

  const handleEdit = (user) => {
    setEditing(user.id);
    setEditForm({
      email: user.email,
      nickname: user.nickname || "",
      role: user.role
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editing, editForm);
      setToast("User updated successfully!");
      setTimeout(() => setToast(""), 4000);
      setEditing(null);
      fetchUsers();
    } catch (err) {
      setToast(err.message);
      setTimeout(() => setToast(""), 4000);
    }
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  if (user?.role !== 'admin') {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <div className="medicines-container">
        <h2>Users Management</h2>

        <div className="user-form-container" style={{ marginBottom: "30px", padding: "20px", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ marginBottom: "20px", color: "#1f2937" }}>Add New User</h3>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#374151" }}>Email</label>
              <input
                type="email"
                placeholder="user@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="form-input"
                style={{ width: "100%", padding: "10px", height: "40px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#374151" }}>Nickname (optional)</label>
              <input
                type="text"
                placeholder="nickname"
                value={form.nickname}
                onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                className="form-input"
                style={{ width: "100%", padding: "10px", height: "40px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#374151" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  style={{ width: "100%", padding: "10px", paddingRight: "40px", height: "40px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#6b7280"
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#374151" }}>Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="form-input"
                style={{ width: "100%", padding: "10px", height: "40px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }}
              >
                <option value="pharmacist">Pharmacist</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              <button type="submit" style={{ padding: "12px 30px", background: "#4f46e5", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "600" }}>
                Add User
              </button>
            </div>
          </form>
        </div>

        <table className="medicines-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nickname</th>
              <th>Role</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  {editing === u.id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      required
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td>
                  {editing === u.id ? (
                    <input
                      type="text"
                      value={editForm.nickname}
                      onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value })}
                    />
                  ) : (
                    u.nickname || '-'
                  )}
                </td>
                <td>
                  {editing === u.id ? (
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    >
                      <option value="pharmacist">Pharmacist</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
                <td>
                  {u.role !== 'admin' && (
                    <>
                      {editing === u.id ? (
                        <>
                          <button onClick={handleUpdate} style={{ marginRight: '5px', background: '#10b981' }}>Save</button>
                          <button onClick={cancelEdit} style={{ background: '#6b7280' }}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(u)} style={{ marginRight: '5px', background: '#3b82f6' }}>Edit</button>
                          <button onClick={() => handleDelete(u.id)} style={{ background: '#ef4444' }}>Delete</button>
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;