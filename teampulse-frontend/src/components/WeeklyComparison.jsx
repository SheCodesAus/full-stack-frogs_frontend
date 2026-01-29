import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './WeeklyComparison.css'

// Chart configurations
const chartConfig = {
    mood: {
        title: "Weekly trend for Average Team Mood",
        yAxisDomain: [1, 4],
        yAxisTicks: [1, 2, 3, 4],
        tickFormatter: {
            1: "Angry",
            2: "Anxious",
            3: "Calm",
            4: "Empowered",
        }
    },
    workload: {
        title: "Weekly trend for Average Team Workload",
        yAxisDomain: [1, 4],
        yAxisTicks: [1, 2, 3, 4],
        tickFormatter: {
            1: "Overwhelmed",
            2: "Under Pressure",
            3: "Manageable",
            4: "Light",
        }
    }
};
const WeeklyComparison = ({ isAnimationActive = true, team, logs = [], chartType = "mood" }) => {
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
        let maxWeek = 0;
        
        logs.forEach(log => {
            const weekIndex = log.week_index;
            const timestamp = log.timestamp_local;
            maxWeek = Math.max(maxWeek, parseInt(weekIndex));
            
            if (!weeklyData[weekIndex]) {
                weeklyData[weekIndex] = {
                    values: [],
                    timestamp: timestamp
                };
            }
            weeklyData[weekIndex].values.push(log[valueKey]);
        });

        // Create array of last 4 weeks (including weeks with no data)
        const last4WeekIndices = [];
        for (let i = 3; i >= 0; i--) {
            last4WeekIndices.push(maxWeek - i);
        }

        // Create data for all 4 weeks, with 0 for weeks that have no logs
        const processedData = last4WeekIndices.map((weekIndex) => {
            const weekLabel = `Week ${weekIndex}`;
            if (weeklyData[weekIndex]) {
                return {
                    week: weekLabel,
                    currentPeriod: parseFloat((weeklyData[weekIndex].values.reduce((a, b) => a + b, 0) / weeklyData[weekIndex].values.length).toFixed(2))
                };
            } else {
                return {
                    week: weekLabel,
                    currentPeriod: 0
                };
            }
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
            </LineChart>
        </div>
    );
}

export default WeeklyComparison;