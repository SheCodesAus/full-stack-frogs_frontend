import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './WeeklyComparison.css'
import Button from './ButtonComponent';
import Loader from './Loader';

function useIsDesktop(minWidth = 800) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= minWidth);

    useEffect(() => {
        const onResize = () => setIsDesktop(window.innerWidth >= minWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [minWidth]);

    return isDesktop;
}
// #Data simulation

// Chart configurations
const chartConfig = {
    mood: {
        title: "Weekly trend for Average Team Mood",
        data: [
            { week: 'Current', currentPeriod: 3.16, prevPeriod: 2.9 },
            { week: 'Week 32', currentPeriod: 1.72, prevPeriod: 3 },
            { week: 'Week 33', currentPeriod: 3.04, prevPeriod: 3.5 },
            { week: 'Week 34', currentPeriod: 2.32, prevPeriod: 1.8 },
        ],
        yAxisDomain: [1, 4],
        yAxisTicks: [1, 2, 3, 4],
        tickFormatter: {
            1: "Angry",
            2: "Anxious",
            3: "Calm",
            4: "Empowered",
        },
        lineColor1: "#82ca9d",
        lineColor2: "#8884d8"
    },
    workload: {
        title: "Weekly trend for Average Team Workload",
        data: [
            { week: 'Current', currentPeriod: 3.2, prevPeriod: 3.0 },
            { week: 'Week 32', currentPeriod: 2.1, prevPeriod: 2.8 },
            { week: 'Week 33', currentPeriod: 2.5, prevPeriod: 2.9 },
            { week: 'Week 34', currentPeriod: 2.8, prevPeriod: 2.4 },
        ],
        yAxisDomain: [1, 4],
        yAxisTicks: [1, 2, 3, 4],
        tickFormatter: {
            1: "Overwhelmed",
            2: "Under Pressure",
            3: "Manageable",
            4: "Light",
        },
        lineColor1: "#fbbf24",
        lineColor2: "#60a5fa"
    }
};
const WeeklyComparison = ({ isAnimationActive = true, team, logs = [], chartType = "mood", data: moodData, moods, workloads }) => {
    const [chartData, setChartData] = useState(null);
    const config = chartConfig[chartType];
    const labels = config.tickFormatter;
    
    useEffect(() => {
        if (!logs || logs.length === 0) {
            // Don't show any data if no logs
            setChartData(null);
            return;
        }

        // Calculate weekly averages from logs for 4 week period
        const valueKey = chartType === "mood" ? "mood_value" : "workload_value";
        
        // Group logs by week_index
        const weeklyData = {};
        logs.forEach(log => {
            const weekIndex = log.week_index;
            const timestamp = log.timestamp_local;
            
            if (!weeklyData[weekIndex]) {
                weeklyData[weekIndex] = {
                    values: [],
                    timestamp: timestamp
                };
            }
            weeklyData[weekIndex].values.push(log[valueKey]);
        });

        const sortedWeeks = Object.entries(weeklyData).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
        const last4Weeks = sortedWeeks.slice(-4);

        // Helper function to format date
        function formatDate(timestampLocal) {
            if (!timestampLocal) return "";
            const date = new Date(timestampLocal);
            return date.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
            });
        }

        const processedData = last4Weeks.map(([weekIndex, data]) => {
            const weekLabel = `Week ${weekIndex}`;
            return {
                week: weekLabel,
                currentPeriod: parseFloat((data.values.reduce((a, b) => a + b, 0) / data.values.length).toFixed(2))
            };
        });

        setChartData(processedData.length > 0 ? processedData : null);
    }, [logs, chartType]);

    if (!chartData) {
        return (
            <div className='weeklyComparisonContainer'>
                <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No data available. Waiting for team check-ins...</p>
            </div>
        );
    }

    const titleText = chartType === "mood" 
        ? "Weekly trend for Average Team Mood"
        : "Weekly trend for Average Team Workload";
    
    return (
        <div className='weeklyComparisonContainer'>
            <div className='weekly-header'>
                <h2 className='headline'>
                    {titleText}
                </h2>
            </div>

            <LineChart
                style={{
                    width: '85%',
                    maxWidth: '700px',
                    maxHeight: '70vh',
                    aspectRatio: 1.68,
                    padding: '6%'
                }}
                data={chartData}
            >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="week" />

                <YAxis
                    width="auto"
                    domain={[1, 4]}
                    ticks={[1, 2, 3, 4]}
                    tickFormatter={(value) => labels[value]}
                    tickLine={false}
                    axisLine={false}
                    padding={{ bottom: 35 }}
                />

                <Tooltip />

                <Legend
                    verticalAlign="top"
                    align="right"
                    height={34}
                    iconType="circle"
                    wrapperStyle={{ top: 35, right: 15 }}
                />

                <Line
                    type="monotone"
                    name="Current Period"
                    dataKey="currentPeriod"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={{ r: 5, strokeWidth: 2, fill: '#fff' }}
                    isAnimationActive={isAnimationActive}
                />

                <Line
                    type="monotone"
                    name="Previous Period"
                    dataKey="prevPeriod"
                    stroke="#8884d8"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={{ r: 2, strokeWidth: 1 }}
                    isAnimationActive={isAnimationActive}
                />
            </LineChart>
        </div>
    );
}

export default WeeklyComparison;