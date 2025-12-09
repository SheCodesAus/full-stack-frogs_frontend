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
    colors: ["#1d4730ff", "#376e4cff", "#7ab28dff", "#a7f4bcff"]
  },
  workload: {
    title: "Current Team Workload Distribution",
    data: [
      { description: "Overwhelmed", count: 5 },
      { description: "Under Pressure", count: 9 },
      { description: "Manageable Load", count: 10 },
      { description: "Light", count: 5 }
    ],
    colors: ["#ca7e04ff", "#ffab23ff", "#edc356ff", "#f3e699ff"]
  }
};

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ chartType = "workload" }) {
  const [chartData, setChartData] = useState(null);
  const config = chartConfig[chartType];

  useEffect(() => {
    const counts = config.data.map(item => item.count);

    setChartData({
      labels: config.data.map(item => item.description),
      datasets: [
        {
          data: counts,
          backgroundColor: config.colors,
          borderWidth: 0
        }
      ]
    });
  }, [chartType]);

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