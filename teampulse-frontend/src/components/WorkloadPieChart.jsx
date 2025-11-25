import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { mockWorkloads } from "../mocks/mockWorkloads";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function WorkloadPieChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    function loadMockData() {
      const workloads = mockWorkloads;        // [{ value:1, description:"..." }, ...]
      const logs = mockPulseLogs;            // [{ workload:2, ... }, ...]

      const counts = [0, 0, 0, 0];

      logs.forEach(log => {
        if (log.workload >= 1 && log.workload <= 4) {
          counts[log.workload - 1] += 1;
        }
      });

      setChartData({
        labels: workloads.map(w => w.description),
        datasets: [
          {
            data: counts,
            backgroundColor: [
              "#4CAF50",  // All Good
              "#3DB9CE",  // Busy But Fine
              "#F9C74F",  // Quite Busy
              "#F9844A"   // Very Busy
            ],
            borderWidth: 0
          }
        ]
      });
    }

    loadMockData();
  }, []);

  if (!chartData) return <p>Loading workload chart...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">
        Current Team Workload Distribution
      </h3>

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