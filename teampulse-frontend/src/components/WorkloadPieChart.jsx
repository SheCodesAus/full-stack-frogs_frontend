import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import './WorkloadPieChart.css'

// Data simulation
const workloadData = [
  { description: "All Good", count: 5 },
  { description: "Busy But Fine", count: 8 },
  { description: "Quite Busy", count: 4 },
  { description: "Very Busy", count: 2 }
];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function WorkloadPieChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    function loadData() {
      const counts = workloadData.map(w => w.count);

      setChartData({
        labels: workloadData.map(w => w.description),
        datasets: [
          {
            data: counts,
            backgroundColor: [
              "#A8D8C4",      // All Good
              "#CFE8FF",   // Busy But Fine
              "#f9db6fff",   // Quite Busy
              "#f19a5c"    // Very Busy
          ],
            borderWidth: 0
          }
        ]
      });
    }

    loadData();
  }, []);

  if (!chartData) return <p>Loading workload chart...</p>;

  return (
    <div className="workload-chart-container">
      <h3>This Weeks Workload Distribution</h3>

      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: "bottom",
              labels: { usePointStyle: true, padding: 20 }
            }
          }
        }}
      />
    </div>
  );
}