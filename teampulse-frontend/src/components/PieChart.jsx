import React, { useEffect, useState } from "react";
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
    data: [
      { description: "Angry", count: 3 },
      { description: "Anxious", count: 6 },
      { description: "Calm", count: 12 },
      { description: "Empowered", count: 8 }
    ],
    colors: ["#8a5a44", "#b07d62", "#d69f7e", "#edc4b3"]
    // colors: ["#1d4730ff", "#376e4cff", "#7ab28dff", "#a7f4bcff"]


  },
  workload: {
    title: "Current Team Workload Distribution",
    data: [
      { description: "Overwhelmed", count: 5 },
      { description: "Under Pressure", count: 9 },
      { description: "Manageable Load", count: 10 },
      { description: "Light", count: 5 }
    ],
    colors: ["#415d43", "#709775", "#8fb996", "#a1cca5"]
    // colors: ["#ca7e04ff", "#ffab23ff", "#edc356ff", "#f3e699ff"]


  }
};

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ chartType = "workload", logs = [] }) {
  const [chartData, setChartData] = useState(null);
  const config = chartConfig[chartType];

  useEffect(() => {
    if (!logs || logs.length === 0) {
      // Don't show any data if no logs provided
      setChartData(null);
      return;
    }

    // Calculate distribution from actual logs
    const moodMap = { 1: "Angry", 2: "Anxious", 3: "Calm", 4: "Empowered" };
    const workloadMap = { 1: "Overwhelmed", 2: "Under Pressure", 3: "Manageable Load", 4: "Light" };
    
    const valueKey = chartType === "mood" ? "mood_value" : "workload_value";
    const valueMap = chartType === "mood" ? moodMap : workloadMap;

    // Count occurrences
    const counts = {};
    logs.forEach(log => {
      const value = log[valueKey];
      const label = valueMap[value];
      counts[label] = (counts[label] || 0) + 1;
    });

    // Get labels in correct order
    const labels = Object.values(valueMap);
    const data = labels.map(label => counts[label] || 0);

    setChartData({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: config.colors,
          borderWidth: 0
        }
      ]
    });
  }, [chartType, logs]);

  if (!chartData) return (
    <div className="pie-chart-container">
      <h3>{config.title}</h3>
      <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No data available. Waiting for team check-ins...</p>
    </div>
  );

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