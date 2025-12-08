import { faFire, faStar } from "@fortawesome/free-solid-svg-icons";
import CardIcon from "../CardIcon";
import "./UserStats.css";

export default function UserStats({ loggedPulses }) {

    // Weekly streak calculation
    const streak = calculateWeeklyStreak(loggedPulses);

    // Total mindful weeks = total number of checkins
    const mindfulWeeks = loggedPulses?.length || 0;

    // Points = 10 per weekly check-in
    const points = mindfulWeeks * 10;

    return (
        <div className="userstats-container">

            {/* LEFT – STREAK */}
            <div className="userstats-block">
                <CardIcon icon={faFire} size="lg" />
                <p className="userstats-value">{streak}</p>
                <p className="userstats-label">Week Streak</p>
            </div>

            {/* CENTER – MINDFUL BADGE */}
            <div className="userstats-badge">
                <div className="badge-number">{mindfulWeeks}</div>
                <div className="badge-label">Mindful Weeks</div>
            </div>

            {/* RIGHT – POINTS */}
            <div className="userstats-block">
                <CardIcon icon={faStar} size="lg" />
                <p className="userstats-value">{points}</p>
                <p className="userstats-label">Points</p>
            </div>

        </div>
    );
}

function calculateWeeklyStreak(loggedPulses) {
    if (!loggedPulses || loggedPulses.length === 0) return 0;

    // Extract week numbers
    const weeks = loggedPulses.map(p => p.week_index).sort((a,b) => b-a);

    let streak = 1;

    for (let i = 0; i < weeks.length - 1; i++) {
        if (weeks[i] - 1 === weeks[i + 1]) streak++;
        else break;
    }

    return streak;
}
