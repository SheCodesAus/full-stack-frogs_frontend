import './DashboardView.css'
import DashboardCard from './DashboardCard'
import WeeklyComparison from '../components/WeeklyComparison'

export default function DashboardView() {
    return(
        <div className='dashboardView-container'>
            <section className="dashboardOverview flex justify-center">
                <DashboardCard title='Check-in Rate' number='100%' detail='19/19 this week'/>
                <DashboardCard title='Needs Attention' number='2' detail='members'/>
                <DashboardCard title='Average Mood' number='3.2' detail='Out of 4.0'/>
                <DashboardCard title='Average Workflow' number='3.6' detail='Out of 4.0'/>
            </section>
            <section className='line-graphs flex justify-center'>
                <WeeklyComparison />
                <WeeklyComparison />
            </section>
        </div>

    )
}

