import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = ({ token }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <div>Total Users: {stats.totalUsers}</div>
      <div>Buyers: {stats.buyers}</div>
      <div>Sellers: {stats.sellers}</div>
      <div>Admins: {stats.admins}</div>
    </div>
  );
};

export default AdminPanel;
