import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./barchart.css";

const BarChart = ({ data }) => {
  const countByGroup = data.reduce((acc, cur) => {
    acc[cur.group_name] = (acc[cur.group_name] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(countByGroup).map(([group, count]) => ({
    group,
    count,
  }));

  return (
    <div className="barchart-container">
      <h3 className="barchart-title">Group-wise Alerts</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ReBarChart data={chartData}>
          <XAxis dataKey="group" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="count" fill="#ff6b6b" />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
