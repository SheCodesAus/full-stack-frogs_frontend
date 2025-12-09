import './DashboardView.css'
import DashboardCard from './DashboardCard'
import WeeklyComparison from '../components/WeeklyComparison'
import PieChart from '../components/PieChart'
import NeedsAttention from './NeedsAttention'

export default function DashboardView({ logs }) {
    const avgMood = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.mood_value, 0) / logs.length).toFixed(1)
        : 0;
    const avgWorkflow = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.workload_value, 0) / logs.length).toFixed(1)
        : 0;

    return (
        <div className='dashboardView-container'>
            <section className="dashboardOverview flex justify-center">
                <DashboardCard title='Check-in Rate' number='100%' detail='19/19 this week' />
                <DashboardCard title='Needs Attention' number='2' detail='members' />
                <DashboardCard title='Average Mood' number={avgMood} detail='Out of 4.0' />
                <DashboardCard title='Average Workflow' number={avgWorkflow} detail='Out of 4.0' />
            </section>
            <NeedsAttention logs={logs} />
            
            {/* Mood Charts Row */}
            <section className='charts-row mood-row'>
                <WeeklyComparison chartType="mood" />
                <PieChart chartType="mood" />
            </section>

            {/* Workload Charts Row */}
            <section className='charts-row workload-row'>
                <WeeklyComparison chartType="workload" />
                <PieChart chartType="workload" />
            </section>
        </div>
    )
}