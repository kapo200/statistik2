import React, { useState } from "react";
import HeaderBar from "./HeaderBar.jsx";
import DayPeriodForm from "./DayPeriodForm.jsx";
import StatsChart from "./StatsChart.jsx";
import sampleData from "./sampleData.js";

function App() {
  
  const [formValues, setFormValues] = useState({
    yearFrom: "2021",
    yearTo: "2024",
    monthFrom: "იანვარი",
    monthTo: "მარტი",
    amount: 100,
  });


  const [chartPoints, setChartPoints] = useState(sampleData);

  function handleFormChange(newValues) {
    setFormValues(prev => ({ ...prev, ...newValues }));
  }

  
  function handleCustomData(newPoints) {
    setChartPoints(newPoints);
  }

  return (
    <div className="page">
      <HeaderBar />
      <main className="container">
        <section className="top-row">
          <DayPeriodForm
            formValues={formValues}
            onFormChange={handleFormChange}
            onCustomData={handleCustomData}
          />
        </section>

        <section className="chart-row">
          <div className="card">
            <h3 className="card-title">საშუალო ფასების ინდექსი</h3>
            <StatsChart data={chartPoints} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;