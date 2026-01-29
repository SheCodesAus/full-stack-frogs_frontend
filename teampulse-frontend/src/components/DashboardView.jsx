import './DashboardView.css'
import { useMemo } from 'react';

import PieChart from '../components/PieChart'
import NeedsAttentionBox from './NeedsAttention'
import DashboardCard from './DashboardCard';
import CardIcon from './CardIcon';
import WeeklyComparison from '../components/WeeklyComparison';
import Loader from './Loader';

import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function DashboardView({ logs, logsHistory = [], participationRate, teamCount, logsCounts, team, moodOption, workloadOption, isLoading = false }) {
    // Filter logs by current team
    const teamLogs = useMemo(() => {
        if (!logs || logs.length === 0) return [];
        return logs.filter(log => log.team_id === team || log.team === team);
    }, [logs, team]);

    const flaggedCount = useMemo(() => {
        if (!teamLogs || teamLogs.length === 0) return 0;
        return teamLogs.filter(log => log.mood === 1 || log.workload === 1).length;
    }, [teamLogs]);

    if (!moodOption?.length || !workloadOption?.length) {
        return <Loader />;
    }

    const avgMood = teamLogs.length > 0
        ? (teamLogs.reduce((sum, log) => sum + log.mood_value, 0) / teamLogs.length).toFixed(1)
        : 0;
    const avgWorkflow = teamLogs.length > 0
        ? (teamLogs.reduce((sum, log) => sum + log.workload_value, 0) / teamLogs.length).toFixed(1)
        : 0;

    return (
        <div className='dashboardView-container'>
            <section>
                <div className="dashboardOverview">
                    <div className='dashboardOverview-header flex align-center'>
                        <span><CardIcon icon={faCalendar} size='lg' color={'var(--primary)'} /></span>
                        <span><h1 className='dashboard-title'>Week at a glance</h1></span>
                    </div>
                    <div className="dashboardCards-row">
                        <DashboardCard title='Check-in Rate' number={`${participationRate}%`} detail={`${logsCounts}/${teamCount} this week`} />
                        <DashboardCard title='Needs Attention' number={flaggedCount} detail='members' />
                        <DashboardCard title='Average Mood' number={avgMood} detail='Out of 4.0' />
                        <DashboardCard title='Average Workflow' number={avgWorkflow} detail='Out of 4.0' />
                    </div>
                </div>
            </section>
            <NeedsAttentionBox logs={teamLogs} />
            <section className='charts-row mood-row'>
                <WeeklyComparison chartType="mood" team={team} logs={logsHistory.length > 0 ? logsHistory : teamLogs} moods={moodOption} isLoading={isLoading} />
                <PieChart chartType="mood" logs={teamLogs} isLoading={isLoading} />
            </section>

            <section className='charts-row workload-row'>
                <WeeklyComparison chartType="workload" team={team} logs={logsHistory.length > 0 ? logsHistory : teamLogs} workloads={workloadOption} isLoading={isLoading} />
                <PieChart chartType="workload" logs={teamLogs} isLoading={isLoading} />
            </section>
        </div>
    )
}