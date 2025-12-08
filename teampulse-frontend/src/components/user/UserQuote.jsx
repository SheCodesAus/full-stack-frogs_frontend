// src/components/user/UserQuote.jsx

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

function getLatestPulse(loggedPulses = []) {
    if (!loggedPulses.length) return null;
    return [...loggedPulses].sort((a, b) => b.year_week - a.year_week)[0];
}

function buildQuote(pulse, firstName) {
    if (!pulse) {
        return {
            headline: "Your check-ins, your story.",
            body: "Each weekly check-in is a tiny design decision for your life. Start where you are — the first step is simply noticing.",
        };
    }

    const mood = pulse.mood_value ?? pulse.mood;
    const workload = pulse.workload_value ?? pulse.workload;

    const namePrefix = firstName ? `${firstName}, ` : "";

    // Feeling stretched or low
    if ((mood <= 2 && workload >= 2) || workload >= 3) {
        return {
            headline: "You’re allowed to pause.",
            body: `${namePrefix}it’s okay to feel stretched. Today, pick one small thing you can say “no” to, and one kind thing you can do for yourself.`,
        };
    }

    // Mood is calm / empowered but workload high
    if (mood >= 3 && workload >= 3) {
        return {
            headline: "Protect your focus.",
            body: `${namePrefix}you’re showing up with strength. Try blocking a tiny pocket of time this week that’s just for you — no meetings, no messages.`,
        };
    }

    // Mood low but workload lighter
    if (mood <= 2 && workload <= 2) {
        return {
            headline: "Gentle wins still count.",
            body: `${namePrefix}even on softer weeks, checking in is a win. Reach out to someone you trust and share how you’re feeling — you don’t have to hold it alone.`,
        };
    }

    // Generally good state
    return {
        headline: "Keep designing your days.",
        body: `${namePrefix}you’re building a sustainable rhythm. Celebrate one small decision you made this week that supported your wellbeing.`,
    };
}

export default function UserQuote({ firstName, loggedPulses }) {
    const latest = getLatestPulse(loggedPulses);
    const { headline, body } = buildQuote(latest, firstName);

    const moodText = latest
        ? MOOD_LABELS[latest.mood_value ?? latest.mood]
        : null;
    const workloadText = latest
        ? WORKLOAD_LABELS[latest.workload_value ?? latest.workload]
        : null;

    return (
        <div className="user-quote-card">
            <div className="user-quote-header">
                <span className="user-quote-icon">“</span>
                <div>
                    <h2>Weekly reflection</h2>
                    {latest && (
                        <p className="user-quote-meta">
                            This week you felt <strong>{moodText}</strong> with a{" "}
                            <strong>{workloadText}</strong> workload.
                        </p>
                    )}
                </div>
            </div>

            <h3 className="user-quote-headline">{headline}</h3>
            <p className="user-quote-body">{body}</p>

            <p className="user-quote-footer">
                Tiny check-ins, big clarity — empowering you to design work that works
                for you.
            </p>
        </div>
    );
}
