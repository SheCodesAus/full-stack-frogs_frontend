// src/components/manager/AllCheckinsView.jsx

const MOOD_LABELS = {
    1: "Angry",
    2: "Anxious",
    3: "Calm",
    4: "Empowered",
};

const WORKLOAD_LABELS = {
    1: "Overwhelmed",
    2: "Under pressure",
    3: "Manageable load",
    4: "Light",
};

function formatDate(timestampLocal) {
    if (!timestampLocal) return "";
    const date = new Date(timestampLocal);
    return date.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

export default function AllCheckinsView({ logs }) {
    if (!logs || logs.length === 0) {
        return (
            <section className="manager-section">
                <h2>All Team Check-ins</h2>
                <p>No check-ins for this week.</p>
            </section>
        );
    }

    // Sort newest → oldest
    const sorted = [...logs].sort(
        (a, b) => new Date(b.timestamp_local) - new Date(a.timestamp_local)
    );

    return (
        <section className="manager-section">


            <div className="manager-checkins-list">
                {sorted.map((item) => {
                    const mood = MOOD_LABELS[item.mood_value ?? item.mood];
                    const workload = WORKLOAD_LABELS[item.workload_value ?? item.workload];

                    return (
                        <article key={item.id} className="manager-checkin-card">
                            {/* Header */}
                            <div className="manager-checkin-header">
                                <p className="manager-checkin-date">
                                    Week {item.week_index} • {formatDate(item.timestamp_local)}
                                </p>
                                <span className="manager-checkin-badge">Check-in</span>
                            </div>

                            {/* Name + Tags */}
                            <div className="manager-checkin-info-row">
                                <p className="manager-checkin-name">
                                    {item.first_name} {item.last_name}
                                </p>

                                <div className="manager-checkin-tags">
                                    <span className="manager-chip manager-chip--mood">
                                        {mood}
                                    </span>
                                    <span className="manager-chip manager-chip--workload">
                                        {workload}
                                    </span>
                                </div>
                            </div>

                            {/* Comment */}
                            {item.comment && item.comment.trim() !== "" && (
                                <p className="manager-checkin-comment">“{item.comment}”</p>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
