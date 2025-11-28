import { useState, useEffect } from 'react';
import './DashboardPage.css'
import { mockTeams } from "../data/mockTeams";
import { mockPulseLogs } from "../data/mockPulseLogs";

import DashboardButton from '../components/DashboardButton';
import Logo from '../components/Logo'
import DashboardView from '../components/DashboardView';


const lowPerson = {
    name: "Sara",
    type: "Mood",
};


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
            {/* {view === "checkins" && <AllCheckinsView />} */}
            {view === "dashboard" && <DashboardView />}
        </section>
    )
};

export default DashboardPage;