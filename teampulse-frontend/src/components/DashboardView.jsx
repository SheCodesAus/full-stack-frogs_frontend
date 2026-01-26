import './DashboardView.css'
import { useMemo } from 'react';

import PieChart from '../components/PieChart'
import NeedsAttentionBox from './NeedsAttention'
import DashboardCard from './DashboardCard';
import CardIcon from './CardIcon';
import WeeklyComparison from '../components/WeeklyComparison';
import Loader from './Loader';
import { useNeedsAttention } from '../hooks/use-needs-attention.js';

import { faCalendar } from "@fortawesome/free-solid-svg-icons";

import { teamMoodData } from "../data/mockForTeamMood";
import { teamWorkflowData } from "../data/mockForTeamWorkflow";

export default function DashboardView({ logs, participationRate, teamCount, logsCounts, team, moodOption, workloadOption }) {
    const { needsAttention } = useNeedsAttention(team);

    if (!moodOption?.length || !workloadOption?.length) {
        return <Loader />;
    }

    const avgMood = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.mood_value, 0) / logs.length).toFixed(1)
        : 0;
    const avgWorkflow = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.workload_value, 0) / logs.length).toFixed(1)
        : 0;

    const moodDataForTeam = teamMoodData[team];
    const workloadDataForTeam = teamWorkflowData[team];

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
                        <DashboardCard title='Needs Attention' number={needsAttention.length} detail='members' />
                        <DashboardCard title='Average Mood' number={avgMood} detail='Out of 4.0' />
                        <DashboardCard title='Average Workflow' number={avgWorkflow} detail='Out of 4.0' />
                    </div>
                </div>
            </section>
            <NeedsAttentionBox team={team} />
            <section className='charts-row mood-row'>
                <WeeklyComparison chartType="mood" team={team} data={moodDataForTeam} moods={moodOption} />
                <PieChart chartType="mood" />
            </section>

            <section className='charts-row workload-row'>
                <WeeklyComparison chartType="workload" team={team} data={workloadDataForTeam} workloads={workloadOption} />
                <PieChart chartType="workload" />
            </section>
        </div>
    )
}