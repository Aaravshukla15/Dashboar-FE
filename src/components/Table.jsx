import React from "react";
import "./datatable.css";

const DataTable = ({ data }) => {
  return (
    <div className="data-table-wrapper">
      <h3 className="data-table-title">Details Table</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Group</th>
            <th>Discovered</th>
            <th>Sector</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.post_title}</td>
              <td>{d.group_name}</td>
              <td>{new Date(d.discovered).toLocaleDateString()}</td>
              <td>{d.sector || "N/A"}</td>
              <td>
                {d.geolocation
                  ? `${d.geolocation.city || "Unknown"}, ${
                      d.geolocation.country || "Unknown"
                    }`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
