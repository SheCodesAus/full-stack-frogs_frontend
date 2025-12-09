import { useMemo } from 'react';
import './DashboardView.css'
import DashboardCard from './DashboardCard'
import WeeklyComparison from './WeeklyComparison'
import PieChart from './PieChart'
import NeedsAttention from './NeedsAttention'

export default function DashboardView({ logs }) {
    const avgMood = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.mood_value, 0) / logs.length).toFixed(1)
        : 0;
    const avgWorkflow = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.workload_value, 0) / logs.length).toFixed(1)
        : 0;

    // Calculate flagged members - SAME LOGIC AS NeedsAttention.jsx
    const flaggedMembersCount = useMemo(() => {
        if (!logs || logs.length === 0) return 0;

        const memberMap = {};

        logs.forEach(log => {
            if (!memberMap[log.user]) {
                memberMap[log.user] = {
                    mood_value: log.mood_value,
                    workload_value: log.workload_value,
                    timestamp: log.timestamp
                };
            } else {
                if (new Date(log.timestamp) > new Date(memberMap[log.user].timestamp)) {
                    memberMap[log.user] = {
                        mood_value: log.mood_value,
                        workload_value: log.workload_value,
                        timestamp: log.timestamp
                    };
                }
            }
        });

        return Object.values(memberMap).filter(member => 
            Math.round(member.mood_value) === 1 || Math.round(member.workload_value) === 1
        ).length;
    }, [logs]);

    return (
        <div className='dashboardView-container'>
            <section className="dashboardOverview flex justify-center">
                <DashboardCard title='Check-in Rate' number='100%' detail='19/19 this week' />
                <DashboardCard title='Needs Attention' number={flaggedMembersCount} detail='members' />
                <DashboardCard title='Average Mood' number={avgMood} detail='Out of 4.0' />
                <DashboardCard title='Average Workflow' number={avgWorkflow} detail='Out of 4.0' />
            </section>
            <NeedsAttention logs={logs} />
            
            {/* Mood Charts Row */}
            <section className='charts-row mood-row'>
                <WeeklyComparison chartType="mood" logs={logs} />
                <PieChart chartType="mood" logs={logs} />
            </section>

            {/* Workload Charts Row */}
            <section className='charts-row workload-row'>
                <WeeklyComparison chartType="workload" logs={logs} />
                <PieChart chartType="workload" logs={logs} />
            </section>
        </div>
    )
}