// src/components/user/UserStats.jsx

// Helper to compute streak using year_week (e.g. 202548)
function calculateWeekStreak(loggedPulses = []) {
    if (!loggedPulses.length) return 0;

    const sorted = [...loggedPulses].sort(
        (a, b) => b.year_week - a.year_week
    );

    let streak = 1;

    for (let i = 0; i < sorted.length - 1; i++) {
        const current = sorted[i].year_week;
        const next = sorted[i + 1].year_week;

        if (current - next === 1) {
            streak += 1;
        } else {
            break;
        }
    }

    return streak;
}

export default function UserStats({ loggedPulses }) {
    const totalCheckins = loggedPulses?.length ?? 0;
    const points = totalCheckins * 10;
    const streak = calculateWeekStreak(loggedPulses);

    return (
        <div className="user-stats-grid">
            <div className="user-stat-card">
                <p className="user-stat-label">Total check-ins</p>
                <p className="user-stat-value">{totalCheckins}</p>
                <p className="user-stat-caption">
                    That’s {totalCheckins} mindful week
                    {totalCheckins === 1 ? "" : "s"} logged.
                </p>
            </div>

            <div className="user-stat-card">
                <p className="user-stat-label">Current streak</p>
                <p className="user-stat-value">{streak}</p>
                <p className="user-stat-caption">
                    Consecutive weeks you’ve shown up for yourself.
                </p>
            </div>

            <div className="user-stat-card">
                <p className="user-stat-label">Wellbeing points</p>
                <p className="user-stat-value">{points}</p>
                <p className="user-stat-caption">
                    10 points for every weekly check-in. Small steps, big impact.
                </p>
            </div>
        </div>
    );
}
