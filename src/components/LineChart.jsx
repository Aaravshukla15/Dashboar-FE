import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./linechart.css";

const LineChart = ({ data }) => {
  const countByDate = data.reduce((acc, cur) => {
    const date = new Date(cur.discovered).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(countByDate).map((date) => ({
    date,
    count: countByDate[date],
  }));

  return (
    <div className="linechart-container">
      <h3 className="linechart-title">Daily Alerts</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ReLineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="count" stroke="#00f7ff" />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
