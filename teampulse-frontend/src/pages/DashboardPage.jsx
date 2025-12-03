import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import './DashboardPage.css'
import { mockPulseLogs } from "../data/mockPulseLogs";

import DashboardButton from '../components/DashboardButton';
import Logo from '../components/Logo'
import DashboardView from '../components/DashboardView';
import AllCheckinsView from '../components/AllCheckinView';
import useTeams from '../hooks/use-teams';

const lowPerson = {
    name: "Sara",
    type: "Mood",
};


function DashboardPage() {
    const { teams } = useTeams();
    const navigate = useNavigate();
    const [view, setView] = useState("dashboard");
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [pulseLogs, setPulseLogs] = useState([]);


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        setPulseLogs(mockPulseLogs);

    }, []);


    useEffect(() => {
        if (teams.length > 0 && !selectedTeam) {
            setSelectedTeam(teams[0].id);
        }
    }, [teams]);

    const teamLogs = useMemo(() => {
        if (!selectedTeam) return [];
        return pulseLogs.filter(log => log.team === selectedTeam);
    }, [pulseLogs, selectedTeam]);

    if (teams.length === 0) {
        return <></>;
    }


    return (
        <section className='dashboard-container'>
            <div className='dashboard-switchview'>
                <DashboardButton
                    text='Dashboard'
                    isActive={view === "dashboard"}
                    onClick={() => setView("dashboard")}
                />
                <DashboardButton
                    text='All Check-ins'
                    isActive={view === "checkins"}
                    onClick={() => setView("checkins")}
                />
            </div>
            <div className='dashboard-chooseteam flex justify-center'>
                {teams.map((team) => (
                    <DashboardButton
                        key={team.id}
                        text={team.team_name}
                        isActive={selectedTeam === team.id}
                        onClick={() => setSelectedTeam(team.id)}
                    />
                ))}
            </div>
            <div className='dashboard-overview'>

            </div>
            {view === "checkins" && <AllCheckinsView />}
            {view === "dashboard" && <DashboardView logs={teamLogs} />}
        </section>
    )
};

export default DashboardPage;