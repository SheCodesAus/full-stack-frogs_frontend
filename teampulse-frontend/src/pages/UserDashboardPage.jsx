// src/pages/UserDashboardPage.jsx
import { useEffect, useState, useMemo } from "react";
import "./UserDashboardPage.css";
import { useAuth } from '../hooks/use-auth';


import DashboardButton from "../components/DashboardButton";
import UserDashboard from "../components/user/UserDashboard";
import UserCheckins from "../components/user/UserCheckins";


export default function UserDashboardPage() {
    const [view, setView] = useState("dashboard");
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth, setAuth } = useAuth();


    // Fetch user + logged pulses
    useEffect(() => {
        async function fetchUser() {
            try {
                setIsLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${auth.user.id}`);
                if (!res.ok) {
                    throw new Error("Unable to load your wellbeing data just now.");
                }
                const data = await res.json();
                setUserData(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, []);

    const loggedPulses = useMemo(
        () => userData?.logged_pulses ?? [],
        [userData]
    );

    return (
        <div className="user-dashboard-page">
            <header className="user-dashboard-header">
                <div className="user-dashboard-title-group">
                    <p className="user-dashboard-eyebrow">Profile</p>
                    <h1 className="user-dashboard-title">Your wellbeing hub</h1>
                    <p className="user-dashboard-subtitle">
                        A gentle space to check in, reflect and keep burnout at bay.
                    </p>
                </div>

                <div className="user-dashboard-toggle">
                    <DashboardButton
                        text="Dashboard"
                        isActive={view === "dashboard"}
                        onClick={() => setView("dashboard")}
                    />
                    <DashboardButton
                        width={'2vw'}
                        text="All Check-ins"
                        isActive={view === "checkins"}
                        onClick={() => setView("checkins")}
                    />
                </div>
            </header>

            {isLoading && (
                <div className="user-dashboard-state-message">
                    Loading your check-ins…
                </div>
            )}

            {error && !isLoading && (
                <div className="user-dashboard-state-message user-dashboard-error">
                    {error}
                </div>
            )}

            {!isLoading && !error && (
                <main className="user-dashboard-main">
                    {view === "dashboard" && (
                        <UserDashboard
                            firstName={userData?.first_name}
                            loggedPulses={loggedPulses}
                        />
                    )}

                    {view === "checkins" && (
                        <UserCheckins
                            firstName={userData?.first_name}
                            loggedPulses={loggedPulses}
                        />
                    )}
                </main>
            )}
        </div>
    );
}
