import WeeklyComparison from '../components/WeeklyComparison';
import WorkloadPieChart from "../components/WorkLoadPieChart";

function DashboardPage() {
    return (
        <section>
            <WeeklyComparison />;
            <WorkloadPieChart/>
        </section>
    )
};

export default DashboardPage;