import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './WeeklyComparison.css'
import Button from './ButtonComponent';

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
const moodData = [
    { week: 'Current', currentPeriod: 3.16, prevPeriod: 2.9 },
    { week: 'Week 32', currentPeriod: 1.72, prevPeriod: 3 },
    { week: 'Week 33', currentPeriod: 3.04, prevPeriod: 3.5 },
    { week: 'Week 34', currentPeriod: 2.32, prevPeriod: 1.8 },
];

const workflowData = [
    { week: 'Current', workflow: 8.5, prevPeriod: 8.0 },
    { week: 'Week 32', workflow: 6.8, prevPeriod: 7.5 },
    { week: 'Week 33', workflow: 5.5, prevPeriod: 7.0 },
    { week: 'Week 34', workflow: 7.1, prevPeriod: 6.5 },
];
const moodLabels = {
    1: "Angry",
    2: "Anxious",
    3: "Calm",
    4: "Motivated",
};


const LineChartExample = ({ isAnimationActive = true }) => {
    const isDesktop = useIsDesktop();
    return (
        <div className="weeklyComparisonContainer">
            <div className="headline">Weekly trend for <strong>Average Team Mood </strong></div>
            <div className="chartWrapper">

                <ResponsiveContainer width="100%" aspect={isDesktop ? 1.6 : 1.2}>
                    <LineChart data={moodData}
                        margin={
                            isDesktop
                                ? { top: 20, right: 40, left: 40, bottom: 40 }
                                : { top: 10, right: 30, left: 20, bottom: 30 }
                        } >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" tick={{ fontSize: isDesktop ? 14 : 12 }} />
                        <YAxis
                            domain={[1, 4]}
                            ticks={[1, 2, 3, 4]}
                            tickFormatter={(value) => moodLabels[value]}
                            tickLine={false}
                            axisLine={false}
                            padding={{ bottom: 35 }}
                            tick={{ fontSize: isDesktop ? 14 : 12 }}
                        />
                        <Tooltip />
                        <Legend
                            verticalAlign="top"
                            align="right"
                            height={34}
                            iconType="circle"
                            wrapperStyle={{
                                top: 5,
                                right: 19,
                                fontSize: isDesktop ? "1rem" : "0.85rem",
                            }}
                        />                        
                        <Line type="monotone" name="Current Period" dataKey="currentPeriod" stroke="#82ca9d" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" name="Previous Period" dataKey="prevPeriod" stroke="#8884d8" strokeWidth={2} strokeDasharray="3 3" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div >
    )
};

export default LineChartExample;