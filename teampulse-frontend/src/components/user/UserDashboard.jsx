// src/components/user/UserDashboard.jsx
import UserStats from "./UserStats";
import UserWeeklyComparison from "./UserWeeklyComparison";
import UserQuote from "./UserQuote";

export default function UserDashboard({ firstName, loggedPulses }) {
    return (
        <div className="user-dashboard-layout">
            <section className="user-section user-section--stats">
                <div className="user-section-header">
                    <h2>My Stats</h2>
                    <p>
                        {firstName
                            ? `${firstName}, every weekly check-in is a step toward a more sustainable workflow.`
                            : "Every weekly check-in is a step toward a more sustainable workflow."}
                    </p>
                </div>
                <UserStats loggedPulses={loggedPulses} />
            </section>

            <section className="user-section user-section--weekly">
                <div className="user-section-header">
                    <h2>Weekly comparison</h2>
                    <p>Spot patterns over the last four weeks and adjust before burnout hits.</p>
                </div>
                <UserWeeklyComparison loggedPulses={loggedPulses} />
            </section>

            <section className="user-section user-section--quote">
                <UserQuote firstName={firstName} loggedPulses={loggedPulses} />
            </section>
        </div>
    );
}
