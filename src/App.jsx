import React, { useEffect, useState } from "react";
import Filters from "./components/Filters";
import AlertStats from "./components/AlertStats";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import MapComponent from "./components/MapComponent";
import DataTable from "./components/Table";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL);
        if (!res.ok) {
          console.error(`HTTP Error: ${res.status} - ${res.statusText}`);
          return;
        }
        const result = await res.json();

        if (Array.isArray(result)) {
          setData(result);
          setFilteredData(result);
        } else {
          console.error("Expected array but got:", result);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filter) => {
    const now = new Date();
    let filtered = [];

    switch (filter.type) {
      case "Daily": {
        filtered = data.filter((item) => {
          const diff =
            (now - new Date(item.discovered)) / (1000 * 60 * 60 * 24);
          return diff <= 1;
        });
        break;
      }
      case "Month": {
        filtered = data.filter(
          (item) =>
            new Date(item.discovered).getMonth() + 1 === parseInt(filter.value)
        );
        break;
      }
      case "Year": {
        filtered = data.filter(
          (item) =>
            new Date(item.discovered).getFullYear().toString() === filter.value
        );
        break;
      }
      case "Date": {
        filtered = data.filter(
          (item) =>
            new Date(item.discovered).toISOString().split("T")[0] ===
            filter.value
        );
        break;
      }
      case "Range": {
        const start = new Date(filter.value.start);
        const end = new Date(filter.value.end);
        filtered = data.filter((item) => {
          const d = new Date(item.discovered);
          return d >= start && d <= end;
        });
        break;
      }
      default: {
        filtered = data;
      }
    }

    setFilteredData(filtered);
  };

  return (
    <div className="app-container">
      <h1 className="dashboard-title">Ransomware Activity Dashboard</h1>
      <Filters data={data} onFilterChange={handleFilterChange} />
      <AlertStats data={filteredData} />

      <div className="chart-container">
        <LineChart data={filteredData} />
        <BarChart data={filteredData} />
      </div>

      <MapComponent data={filteredData} />
      <DataTable data={filteredData} />
    </div>
  );
}

export default App;

// local host part below
// import React, { useEffect, useState } from "react";
// import Filters from "./components/Filters";
// import AlertStats from "./components/AlertStats";
// import LineChart from "./components/LineChart";
// import BarChart from "./components/BarChart";
// import MapComponent from "./components/MapComponent";
// import DataTable from "./components/Table";
// import "./App.css";

// function App() {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/ransomwareData");
//         const result = await res.json();

//         if (Array.isArray(result)) {
//           setData(result);
//           setFilteredData(result);
//         } else {
//           console.error("Expected array but got:", result);
//         }
//       } catch (err) {
//         console.error("Failed to fetch data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFilterChange = (filter) => {
//     const now = new Date();
//     let filtered = [];

//     switch (filter.type) {
//       case "Daily": {
//         filtered = data.filter((item) => {
//           const diff =
//             (now - new Date(item.discovered)) / (1000 * 60 * 60 * 24);
//           return diff <= 1;
//         });
//         break;
//       }
//       case "Month": {
//         filtered = data.filter(
//           (item) =>
//             new Date(item.discovered).getMonth() + 1 === parseInt(filter.value)
//         );
//         break;
//       }
//       case "Year": {
//         filtered = data.filter(
//           (item) =>
//             new Date(item.discovered).getFullYear().toString() === filter.value
//         );
//         break;
//       }
//       case "Date": {
//         filtered = data.filter(
//           (item) =>
//             new Date(item.discovered).toISOString().split("T")[0] ===
//             filter.value
//         );
//         break;
//       }
//       case "Range": {
//         const start = new Date(filter.value.start);
//         const end = new Date(filter.value.end);
//         filtered = data.filter((item) => {
//           const d = new Date(item.discovered);
//           return d >= start && d <= end;
//         });
//         break;
//       }
//       default: {
//         filtered = data;
//       }
//     }

//     setFilteredData(filtered);
//   };

//   return (
//     <div className="app-container">
//       <h1 className="dashboard-title">Ransomware Activity Dashboard</h1>
//       <Filters data={data} onFilterChange={handleFilterChange} />
//       <AlertStats data={filteredData} />

//       <div className="chart-container">
//         <LineChart data={filteredData} />
//         <BarChart data={filteredData} />
//       </div>

//       <MapComponent data={filteredData} />
//       <DataTable data={filteredData} />
//     </div>
//   );
// }

// export default App;
