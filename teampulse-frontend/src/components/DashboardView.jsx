import './DashboardView.css'
import WorkloadPieChart from '../components/WorkloadPieChart'
import NeedsAttentionBox from './NeedsAttention'
import DashboardCard from './DashboardCard';
import WeeklyComparison from '../components/WeeklyComparison';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import CardIcon from './CardIcon';
import { teamMoodData } from "../data/mockForTeamMood";
import { teamWorkflowData } from "../data/mockForTeamWorkflow";




export default function DashboardView({ logs, participationRate,teamCount,logsCounts, team}) {
    const avgMood = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.mood_value, 0) / logs.length).toFixed(1)
        : 0;
    const avgWorkflow = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.workload_value, 0) / logs.length).toFixed(1)
        : 0;
    const moodDataForTeam = teamMoodData[team];

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
                        <DashboardCard title='Needs Attention' number='2' detail='members' />
                        <DashboardCard title='Average Mood' number={avgMood} detail='Out of 4.0' />
                        <DashboardCard title='Average Workflow' number={avgWorkflow} detail='Out of 4.0' />
                    </div>
                </div>
            </section>
            <NeedsAttentionBox logs={logs} />
            <section className='charts-section flex justify-center gap-4'>
                <WeeklyComparison team={team} moodData={moodDataForTeam}/>
                <WorkloadPieChart />
            </section>

            {/* Workload Charts Row */}
            <section className='charts-row workload-row'>
                <WeeklyComparison chartType="workload" />
                <PieChart chartType="workload" />
            </section>
        </div>
    )
}