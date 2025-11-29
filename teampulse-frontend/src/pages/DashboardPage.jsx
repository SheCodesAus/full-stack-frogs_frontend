import WeeklyComparison from '../components/WeeklyComparison'

function DashboardPage() {
    const [view, setView] = useState("dashboard");
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [pulseLogs, setPulseLogs] = useState([]);
    const [teams, setTeams] = useState([]);


    useEffect(() => {
        // Pretend this is an API call
        setTeams(mockTeams);
        setPulseLogs(mockPulseLogs);
    }, []);

    return (
        <section>
            <WeeklyComparison />
        </section>
    )
};

export default DashboardPage;