import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState({ message: "", description: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Spring Boot API 호출
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 토큰 추가
          },
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load admin dashboard.");
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>{error}</div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Admin Dashboard</h1>
      <p>{data.message}</p>
      <p>{data.description}</p>
    </div>
  );
};

export default AdminDashboard;
