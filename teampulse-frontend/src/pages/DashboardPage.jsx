import { useState, useEffect } from 'react';
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
    const [view, setView] = useState("dashboard");
    const [selectedTeam, setSelectedTeam] = useState(teams[0].id);
    const [pulseLogs, setPulseLogs] = useState([]);
    // const [teams, setTeams] = useState([]);

    useEffect(() => {
        setPulseLogs(mockPulseLogs);
    }, []);

    return (
        <section className='dashboard-container'>
            <div className='dashboard-header flex space-between'>
                <div className='header-left flex align-center'>
                    <Logo size={290} />

                </div>
                <div className='header-right flex align-center'>
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
            {view === "dashboard" && <DashboardView />}
        </section>
    )
};

export default DashboardPage;