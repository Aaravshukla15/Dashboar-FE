import { useState, useEffect } from "react";
import "./Filters.css";

export default function Filters({ data, onFilterChange }) {
  const [selectedOption, setSelectedOption] = useState("All");
  const [years, setYears] = useState([]);
  const [months] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");

  useEffect(() => {
    const uniqueYears = [
      ...new Set(data.map((item) => new Date(item.discovered).getFullYear())),
    ];
    setYears(uniqueYears.sort((a, b) => b - a));
  }, [data]);

  const handleFilterApply = () => {
    let filterConfig = { type: selectedOption };

    if (selectedOption === "Year") filterConfig.value = selectedYear;
    else if (selectedOption === "Month") filterConfig.value = selectedMonth;
    else if (selectedOption === "Date") filterConfig.value = selectedDate;
    else if (selectedOption === "Range")
      filterConfig.value = { start: rangeStart, end: rangeEnd };

    onFilterChange(filterConfig);
  };

  return (
    <div className="filters-container">
      <h2 className="filters-title">Filter By</h2>

      <div className="filters-buttons">
        {["Daily", "Month", "Year", "Date", "Range", "All"].map((opt) => (
          <button
            key={opt}
            onClick={() => setSelectedOption(opt)}
            className={`filter-button ${
              selectedOption === opt ? "active" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {selectedOption === "Year" && (
        <select
          className="filter-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )}

      {selectedOption === "Month" && (
        <select
          className="filter-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {months.map((month, i) => (
            <option key={month} value={i + 1}>
              {month}
            </option>
          ))}
        </select>
      )}

      {selectedOption === "Date" && (
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="filter-input"
        />
      )}

      {selectedOption === "Range" && (
        <div className="filter-range">
          <input
            type="date"
            value={rangeStart}
            onChange={(e) => setRangeStart(e.target.value)}
            className="filter-input"
          />
          <input
            type="date"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(e.target.value)}
            className="filter-input"
          />
        </div>
      )}

      <button onClick={handleFilterApply} className="filter-apply-button">
        Apply Filter
      </button>
    </div>
  );
}
