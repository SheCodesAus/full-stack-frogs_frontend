import React, { useEffect, useState, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import './PieChart.css'

const chartConfig = {
  mood: {
    title: "Current Team Mood Distribution",
    colors: ["#1d4730ff", "#376e4cff", "#7ab28dff", "#a7f4bcff"],
    labels: ["Angry", "Anxious", "Calm", "Empowered"]
  },
  workload: {
    title: "Current Team Workload Distribution",
    colors: ["#ca7e04ff", "#ffab23ff", "#edc356ff", "#f3e699ff"],
    labels: ["Overwhelmed", "Under Pressure", "Manageable Load", "Light"]
  }
};

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ chartType = "workload", logs = [] }) {
  const [chartData, setChartData] = useState(null);
  const config = chartConfig[chartType];

  // Memoize logs to keep dependency array stable
  const memoizedLogs = useMemo(() => logs, [logs]);

  useEffect(() => {
    if (!memoizedLogs || memoizedLogs.length === 0) {
      setChartData(null);
      return;
    }

    // Count distribution based on actual logs
    let counts = [0, 0, 0, 0];

    memoizedLogs.forEach(log => {
      if (chartType === "mood") {
        const moodValue = Math.round(log.mood_value);
        if (moodValue >= 1 && moodValue <= 4) {
          counts[moodValue - 1]++;
        }
      } else if (chartType === "workload") {
        const workloadValue = Math.round(log.workload_value);
        if (workloadValue >= 1 && workloadValue <= 4) {
          counts[workloadValue - 1]++;
        }
      }
    });

    setChartData({
      labels: config.labels,
      datasets: [
        {
          data: counts,
          backgroundColor: config.colors,
          borderWidth: 0
        }
      ]
    });
  }, [chartType, memoizedLogs]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="pie-chart-container">
      <h3>{config.title}</h3>
      <div className="chart-wrapper">
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
    </div>
  );
}