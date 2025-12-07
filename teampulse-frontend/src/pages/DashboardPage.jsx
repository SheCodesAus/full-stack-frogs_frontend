import { useState, useEffect, useMemo } from 'react';
import './DashboardPage.css'

import DashboardButton from '../components/DashboardButton';
import DashboardView from '../components/DashboardView';
import AllCheckinsView from '../components/AllCheckinView';
import useTeams from '../hooks/use-teams';
import Loader from '../components/Loader'
import { useAuth } from '../hooks/use-auth';
import getAllCheckIns from '../api/get-all-checkins';

function DashboardPage() {
    const { teams } = useTeams();
    const [view, setView] = useState("dashboard");
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [pulseLogs, setPulseLogs] = useState([]);
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const { auth, setAuth } = useAuth();

    useEffect(() => {
    async function fetchLogs() {
        if (!auth?.token) return; 

        try {
            const data = await getAllCheckIns(auth.token); 
            setPulseLogs(data);
        } catch (error) {
            console.error("Failed to fetch pulse logs:", error);
        }
    }

    fetchLogs();
}, [auth.token]);

    const myTeams = useMemo(() => {
        if (!auth.user) return [];
        return teams.filter((t) => t.team_manager === auth.user.id);
    }, [teams, auth.user]);

    useEffect(() => {
        if (myTeams.length > 0 && !selectedTeam) {
            setSelectedTeam(myTeams[0].id);
        }
    }, [myTeams]);



    const teamLogs = useMemo(() => {
        if (!selectedTeam) return [];
        return pulseLogs.filter(log => log.team === selectedTeam);
    }, [pulseLogs, selectedTeam]);

    if (myTeams.length === 0) {
        return (
            <p className="no-teams-message">
                Seems like you don't have any teams assigned to you yet.
            </p>
        );
    }
    if (teams.length === 0) {
        return <Loader />;
    }


    return (
        <section className='dashboard-container'>
            <div className='dashboard-switchview justify-center flex'>
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
            <div className='dashboard-selects flex justify-center'>
                <select
                    className='dashboard-chooseteam-select'
                    value={showPlaceholder ? '' : selectedTeam}
                    onChange={(e) => {
                        setSelectedTeam(Number(e.target.value));
                        setShowPlaceholder(false);
                    }}
                >
                    <option value="" disabled hidden>Choose team</option>

                    {myTeams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.team_name}
                        </option>
                    ))}
                </select>
                <select
                    className='dashboard-chooseteam-select'
                    value={showPlaceholder ? '' : selectedTeam}
                    onChange={(e) => {
                        setSelectedTeam(Number(e.target.value));
                        setShowPlaceholder(false);
                    }}
                >
                    <option value="" disabled hidden>Choose team</option>

                    {myTeams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.team_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='dashboard-chooseteam-buttons justify-center'>
                {myTeams.map((team) => (
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
            {view === "checkins" && <AllCheckinsView logs={teamLogs} />}
            {view === "dashboard" && <DashboardView logs={teamLogs} />}
        </section>
    )
};

export default DashboardPage;