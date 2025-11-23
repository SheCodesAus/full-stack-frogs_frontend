import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './WeeklyComparison.css'
import Button from './ButtonComponent';

// #Data simulation
const moodData = [
    { week: 'Week 1', mood: 1.72, prevPeriod: 3 },
    { week: 'Week 2', mood: 3.04, prevPeriod: 3.5 },
    { week: 'Week 3', mood: 2.32, prevPeriod: 1.8 },
    { week: 'Current Week', mood: 3.16, prevPeriod: 2.9 },
];

const workflowData = [
    { week: 'Week 1', workflow: 6.8, prevPeriod: 7.5 },
    { week: 'Week 2', workflow: 5.5, prevPeriod: 7.0 },
    { week: 'Week 3', workflow: 7.1, prevPeriod: 6.5 },
    { week: 'Current Week', workflow: 8.5, prevPeriod: 8.0 },
];
// #endregion

const LineChartExample = ({ isAnimationActive = true }) => (

    <div className='weeklyComparisonContainer'>
        <div className='weekly-header'>
            <h2>Weekly trend for</h2>
            <Button text={'Mood'} width={'18vw'} />
            <Button text={'Workflow'} width={'18vw'} />
        </div>

        <LineChart
            style={{ width: '85%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.68, padding: '6%' }}
            responsive
            data={moodData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis width="auto" domain={[0, 4]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mood" stroke="#82ca9d" strokeWidth={2} dot={{ r: 5, strokeWidth: 2, fill: '#fff' }} isAnimationActive={isAnimationActive} />
            <Line type="monotone" dataKey="prevPeriod" stroke="#8884d8" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 2, strokeWidth: 1 }}
                isAnimationActive={isAnimationActive} />
        </LineChart>

    </div>
);

export default LineChartExample;