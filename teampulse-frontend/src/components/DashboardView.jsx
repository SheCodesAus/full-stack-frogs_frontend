import './DashboardView.css'
import DashboardCard from './DashboardCard'
import WeeklyComparison from '../components/WeeklyComparison'
import WorkloadPieChart from '../components/WorkloadPieChart'

export default function DashboardView() {
    return(
        <div className='dashboardView-container'>
            <section className="dashboardOverview flex justify-center">
                <DashboardCard title='Check-in Rate' number='100%' detail='19/19 this week'/>
                <DashboardCard title='Needs Attention' number='2' detail='members'/>
                <DashboardCard title='Average Mood' number='3.2' detail='Out of 4.0'/>
                <DashboardCard title='Average Workflow' number='3.6' detail='Out of 4.0'/>
            </section>
            <section className='charts-section flex justify-center gap-4'>
                <WeeklyComparison />
                <WorkloadPieChart />
            </section>
        </div>

    )
}

