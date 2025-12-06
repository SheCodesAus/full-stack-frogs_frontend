import './DashboardView.css'
import DashboardCard from './DashboardCard';
import WeeklyComparison from '../components/WeeklyComparison';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import CardIcon from './CardIcon';



export default function DashboardView({ logs, team }) {
    const avgMood = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.mood_value, 0) / logs.length).toFixed(1)
        : 0;
    const avgWorkflow = logs.length > 0
        ? (logs.reduce((sum, log) => sum + log.workload_value, 0) / logs.length).toFixed(1)
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
                        <DashboardCard title='Check-in Rate' number='100%' detail='19/19 this week' />
                        <DashboardCard title='Needs Attention' number='2' detail='members' />
                        <DashboardCard title='Average Mood' number={avgMood} detail='Out of 4.0' />
                        <DashboardCard title='Average Workflow' number={avgWorkflow} detail='Out of 4.0' />
                    </div>
                </div>
            </section>
            <section className='graphs flex justify-center'>
                <WeeklyComparison />
                <WeeklyComparison />
            </section>
        </div>

    )
}

