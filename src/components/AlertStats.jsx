import React from "react";
import "./AlertStats.css";
const AlertStats = ({ data }) => {
  const total = Array.isArray(data) ? data.length : 0;
  const groups = Array.isArray(data)
    ? [...new Set(data.map((d) => d.group_name))].length
    : 0;

  return (
    <div className="alert-stats">
      <div className="stat-box">
        <h2>Total Alerts</h2>
        <p>{total}</p>
      </div>
      <div className="stat-box">
        <h2>Ransomware Groups</h2>
        <p>{groups}</p>
      </div>
    </div>
  );
};

export default AlertStats;
