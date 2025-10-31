import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = ({ token }) => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  if (!token) {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    token = getCookie("token");
  }


  const api = axios.create({
    baseURL: "https://re-style-backend-i9fa.vercel.app/",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };


  const changeUserRole = async (id, newRole) => {
    try {
      const res = await api.patch(`/admin/users/${id}/role`, { role: newRole });
      setUsers(users.map((u) => (u._id === id ? res.data : u)));
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, [token]);

  if (loading) return <div>Loading admin panel...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div>
        <h2>Stats</h2>
        <div>Total Users: {stats.totalUsers}</div>
        <div>Buyers: {stats.buyers}</div>
        <div>Sellers: {stats.sellers}</div>
        <div>Admins: {stats.admins}</div>
      </div>

      <hr />

      <h2>All Users</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => changeUserRole(u._id, e.target.value)}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => deleteUser(u._id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
